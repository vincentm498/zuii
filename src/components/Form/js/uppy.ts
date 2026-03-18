import Uppy, { type UppyFile } from '@uppy/core';
import Compressor from '@uppy/compressor';
import ImageEditor from '@uppy/image-editor';
import Webcam from '@uppy/webcam';
import fr_FR from '@uppy/locales/lib/fr_FR';
import en_US from '@uppy/locales/lib/en_US';


/**
 * Interface représentant une route de fichier distant.
 */
export interface FileInputRoute {
	route: string;
	options?: any;
}

/**
 * Interface pour les restrictions Uppy.
 */
export interface UppyRestrictions {
	maxNumberOfFiles?: number | null;
	maxFileSize?: number | null;
	allowedFileTypes?: string[] | null;
}

/**
 * Récupère la locale Uppy correspondante à la langue demandée.
 *
 * @param {string} [lang] - La langue ('fr' ou 'en'). Par défaut, tente de détecter via le document.
 * @returns {any} La locale Uppy.
 */
export const getUppyLocale = (lang?: string): any => {
	const currentLang = lang || (typeof document !== 'undefined' ? document.documentElement.lang : 'fr') || 'fr';
	return currentLang.startsWith('en') ? en_US : fr_FR;
};

/**
 * Crée et configure une instance Uppy.
 *
 * @param {UppyRestrictions} restrictions - Les restrictions de téléchargement.
 * @param {any} locale - La locale à utiliser.
 * @param {{ allowVideo?: boolean }} [webcamConfig] - La configuration de la webcam.
 * @returns {Uppy} L'instance Uppy configurée.
 */
export const createUppyInstance = (
	restrictions: UppyRestrictions,
	locale: any,
	webcamConfig?: { allowVideo?: boolean }
): Uppy => {
	const uppy = new Uppy({
		locale,
		restrictions: {
			maxNumberOfFiles: null,
			maxFileSize: null,
			allowedFileTypes: null,
			...restrictions
		}
	});

	uppy.use(Compressor);
	uppy.use(ImageEditor);
	
	// 'video-audio' = enregistrement vidéo ; 'picture' = prise de photo
	const webcamModes: ('video-audio' | 'picture')[] = 
		webcamConfig?.allowVideo === false ? ['picture'] : ['video-audio', 'picture'];
	
	uppy.use(Webcam, { modes: webcamModes });

	return uppy;
};

/**
 * Synchronise les fichiers d'Uppy vers un élément input HTML de type file.
 *
 * @param {Uppy} uppy - L'instance Uppy.
 * @param {HTMLInputElement} input - L'élément input cible.
 */
export const syncUppyToInput = (uppy: Uppy, input: HTMLInputElement): void => {
	const dataTransfer = new DataTransfer();
	const files = uppy.getFiles();

	files.forEach((file) => {
		if (file.data instanceof File) {
			dataTransfer.items.add(file.data);
		} else if (file.data instanceof Blob) {
			const f = new File([file.data], file.name, { type: file.data.type });
			dataTransfer.items.add(f);
		}
	});

	input.files = dataTransfer.files;

	// Déclenchement manuel de l'événement change pour les libs de formulaire (Hook Form, etc.)
	input.dispatchEvent(new Event('change', { bubbles: true }));
};

/**
 * Récupère des fichiers distants et les ajoute à l'instance Uppy.
 *
 * @param {Uppy} uppy - L'instance Uppy.
 * @param {FileInputRoute[]} filesToFetch - Liste des fichiers à charger.
 * @param {Set<string>} fetchedUrls - Ensemble des URLs déjà traitées pour éviter les doublons.
 * @param {(error: any) => void} [onError] - Callback en cas d'erreur.
 */
export const fetchRemoteFiles = async (
	uppy: Uppy,
	filesToFetch: FileInputRoute[],
	fetchedUrls: Set<string>,
	onError?: (error: any) => void
): Promise<void> => {
	for (const file of filesToFetch) {
		// Éviter de charger plusieurs fois le même fichier
		if (fetchedUrls.has(file.route)) continue;

		// Marquer comme "en cours/chargé" avant le fetch pour bloquer les appels concurrents
		fetchedUrls.add(file.route);

		try {
			// Vérifier si Uppy possède déjà ce fichier (via métadonnées sourceRoute)
			const isAlreadyInUppy = uppy.getFiles().some(f => f.meta?.sourceRoute === file.route);
			if (isAlreadyInUppy) continue;

			const response = await fetch(file.route, file.options);
			if (!response.ok) throw new Error(`Erreur lors de la récupération du fichier : ${response.statusText}`);

			const data = await response.blob();

			uppy.addFile({
				name: file.route.split('/').pop() || 'file',
				type: file.options?.headers?.['Content-Type'] || data.type,
				data: data,
				meta: {
					sourceRoute: file.route
				}
			});
		} catch (err: any) {
			// Si c'est un doublon détecté par Uppy malgré nos vérifications, on ignore
			if (err.isRestriction && err.message?.includes('déjà')) {
				continue;
			}

			console.error("Uppy fetch error:", err);
			if (onError) onError(err);

			// En cas d'erreur de fetch réelle, on retire de la liste pour permettre de réessayer si nécessaire
			fetchedUrls.delete(file.route);
		}
	}
};

/**
 * Ouvre un fichier Uppy dans un nouvel onglet du navigateur.
 * Crée une URL objet temporaire à partir du blob du fichier, l'ouvre,
 * puis révoque l'URL après un court délai pour libérer la mémoire.
 *
 * @param {UppyFile} file - Le fichier Uppy à ouvrir.
 */
export const openFileInNewTab = (file: UppyFile<Record<string, unknown>, Record<string, unknown>>): void => {
	const blob = file.data instanceof Blob ? file.data : null;
	if (!blob) return;

	const url = URL.createObjectURL(blob);
	const tab = window.open(url, '_blank');

	// Révocation de l'URL après ouverture pour libérer la mémoire
	if (tab) {
		tab.addEventListener('load', () => URL.revokeObjectURL(url));
	} else {
		setTimeout(() => URL.revokeObjectURL(url), 10_000);
	}
};

/**
 * Télécharge un fichier Uppy via une balise <a> temporaire.
 * Crée une URL objet, déclenche le téléchargement, puis révoque l'URL.
 *
 * @param {UppyFile} file - Le fichier Uppy à télécharger.
 */
export const downloadFile = (file: UppyFile<Record<string, unknown>, Record<string, unknown>>): void => {
	const blob = file.data instanceof Blob ? file.data : null;
	if (!blob) return;

	const url = URL.createObjectURL(blob);
	const anchor = document.createElement('a');
	anchor.href = url;
	anchor.download = file.name;
	anchor.style.display = 'none';
	document.body.appendChild(anchor);
	anchor.click();
	document.body.removeChild(anchor);
	setTimeout(() => URL.revokeObjectURL(url), 1_000);
};

/**
 * Observe le conteneur du Dashboard et injecte les boutons "Ouvrir" et "Télécharger"
 * pour chaque item Uppy. Les structures générées calquent exactement le HTML/CSS des
 * composants React Zuii (Group et Button) pour s'affranchir de React ici.
 *
 * @param {HTMLElement} container - Le Dashboard Uppy.
 * @param {Uppy} uppy - L'instance Uppy.
 */
export const setupFileOpenButtons = (
	container: HTMLElement,
	uppy: Uppy
): (() => void) => {
	const injectButtons = (actionWrapper: HTMLElement) => {
		if (actionWrapper.querySelector('[data-zuii-uppy-actions]')) return;

		const fileItem = actionWrapper.closest('.uppy-Dashboard-Item') as HTMLElement | null;
		if (!fileItem) return;

		const rawId = fileItem.id;
		const fileId = rawId?.startsWith('uppy_') ? rawId.slice(5) : null;
		if (!fileId) return;

		// 1. Création du wrapper calqué sur le composant `<Group gap="sm" align="center" style={{ marginRight: '8px' }}>`
		const groupWrapper = document.createElement('div');
		groupWrapper.dataset.zuiiUppyActions = 'true';
		groupWrapper.className = 'group group--gap-none group--center';
		groupWrapper.style.marginRight = '8px';

		// Fonction utilitaire pour créer la structure d'un bouton calqué sur le composant `<Button btnIcon transparent size="xs" variant="light">`
		const createZuiiButton = (iconName: string, title: string, onClick: (file: any) => void) => {
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.title = title;
			btn.setAttribute('aria-label', title);
			// Classes générées par Button (React Bootstrap + classes custom)
			btn.className = 'btn btn-light uppy-Dashboard-Item-action btn-xs btn-icon btn-transparent';

			// Contenu interne généré par Icon + Button
			btn.innerHTML = `<div class="btn-content"><span class="icon icon--size-xs"><i class="${iconName}"></i></span></div>`;

			btn.addEventListener('click', (e) => {
				e.stopPropagation();
				const file = uppy.getFile(fileId);
				if (file) onClick(file);
			});

			return btn;
		};

		// 2. Création du bouton "Ouvrir"
		const openBtn = createZuiiButton('icon-search', 'Ouvrir dans un nouvel onglet', openFileInNewTab);
		// 3. Création du bouton "Télécharger"
		const dlBtn = createZuiiButton('icon-download', 'Télécharger le fichier', downloadFile);

		groupWrapper.appendChild(openBtn);
		groupWrapper.appendChild(dlBtn);

		// Insérer avant le dernier bouton Uppy (généralement la croix supprimer)
		const removeBtn = actionWrapper.querySelector('.uppy-Dashboard-Item-action--remove');
		actionWrapper.insertBefore(groupWrapper, removeBtn);
	};

	const scanAndInject = () => {
		// Injection pour les items fichiers
		container
			.querySelectorAll<HTMLElement>('.uppy-Dashboard-Item-actionWrapper')
			.forEach(injectButtons);

		// Conteneur Webcam (toujours s'assurer qu'il a nos classes Flexbox/Group)
		container
			.querySelectorAll<HTMLElement>('.uppy-Webcam-buttonContainer')
			.forEach(containerEl => {
				containerEl.className = 'group group--gap-sm group--center uppy-Webcam-buttonContainer';
			});

		// Uniformisation des boutons Webcam
		container
			.querySelectorAll<HTMLElement>('.uppy-Webcam-button')
			.forEach(btn => {
				// C'est ça le secret : Preact d'Uppy remplace continuellement ces boutons dans le DOM
				// quand on passe de mode "Capture" à mode "Valider". On ne bloque plus sur le "parent",
				// on vérifie juste si CE bouton précis a déjà reçu notre classe "btn" Zuii.
				// Bouton Vidéo / Record : a besoin d'être vérifié à TOUT moment car son `title` change
				// dynamiquement quand Preact démarre/arrête l'enregistrement
				const isRecordBtn = !btn.classList.contains('uppy-Webcam-button--submit') &&
									!btn.classList.contains('uppy-Webcam-button--discard') &&
									!btn.classList.contains('uppy-Webcam-button--picture');

				if (isRecordBtn) {
					const isRecording = btn.title.toLowerCase().includes('stop') || btn.title.toLowerCase().includes('arrêter');
					const expectedIcon = isRecording ? 'icon-square' : 'icon-video';
					const currentIcon = btn.querySelector('.icon i');

					// Forcer la classe et le contenu si ce n'est pas le bon bouton / bonne icône
					if (!currentIcon || !currentIcon.className.includes(expectedIcon)) {
						btn.className = 'btn btn-danger btn-lg btn-icon uppy-Webcam-button';
						btn.innerHTML = `<div class="btn-content"><span class="icon icon--size-md"><i class="${expectedIcon}"></i></span></div>`;
					}
				}

				if (btn.classList.contains('btn')) return;

				if (btn.classList.contains('uppy-Webcam-button--submit')) {
					btn.className = 'btn btn-primary btn-md btn-icon uppy-Webcam-button uppy-Webcam-button--submit';
					btn.innerHTML = '<div class="btn-content"><span class="icon icon--size-md"><i class="icon-check"></i></span></div>';
				} else if (btn.classList.contains('uppy-Webcam-button--discard')) {
					btn.className = 'btn btn-danger btn-md btn-icon btn-transparent uppy-Webcam-button uppy-Webcam-button--discard';
					btn.innerHTML = '<div class="btn-content"><span class="icon icon--size-md"><i class="icon-trash"></i></span></div>';
				} else if (btn.classList.contains('uppy-Webcam-button--picture')) {
					btn.className = 'btn btn-primary btn-lg btn-icon uppy-Webcam-button uppy-Webcam-button--picture';
					btn.innerHTML = '<div class="btn-content"><span class="icon icon--size-md"><i class="icon-camera"></i></span></div>';
				}
			});
	};

	const observer = new MutationObserver(scanAndInject);
	observer.observe(container, { childList: true, subtree: true, attributes: true, attributeFilter: ['title'] });

	scanAndInject();

	return () => {
		observer.disconnect();
		container.querySelectorAll('[data-zuii-uppy-actions]').forEach(el => el.remove());
	};
};


