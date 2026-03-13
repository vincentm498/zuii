import { useEffect, useState, useRef } from 'react';
import Uppy from '@uppy/core';
import { UppyContextProvider } from '@uppy/react';
import Dashboard from '@uppy/react/dashboard';
import Compressor from '@uppy/compressor';
import ImageEditor from '@uppy/image-editor';

// Importation des locales Uppy
import fr_FR from '@uppy/locales/lib/fr_FR';
import en_US from '@uppy/locales/lib/en_US';

/**
 * Propriétés du composant FileInput.
 */
interface FileInputProps {
	/** Nom du champ. */
	name?: string;
	/** Langue du composant ('fr' ou 'en'). */
	lang?: 'fr' | 'en';
	/** Restrictions de téléchargement. */
	restrictions?: {
		/** Nombre maximum de fichiers. */
		maxNumberOfFiles?: number;
		/** Taille maximum d'un fichier en octets. */
		maxFileSize?: number;
		/** Types de fichiers autorisés. */
		allowedFileTypes?: string[];
	};
	/** Callback appelé lors de la fin du téléchargement. */
	onComplete?: (result: any) => void;
	/** Callback appelé en cas d'erreur. */
	onError?: (error: any) => void;
}

/**
 * Composant FileInput utilisant Uppy.js pour le téléchargement de fichiers.
 * Affiche le Dashboard Uppy complet par défaut.
 *
 * @param {FileInputProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant FileInput rendu.
 */
export const FileInput = ({
	name,
	lang,
	restrictions,
	onComplete,
	onError
}: FileInputProps) => {
	// Fusion des restrictions avec les valeurs par défaut (on laisse Uppy gérer si non précisé)
	const mergedRestrictions = {
		maxNumberOfFiles: null,
		maxFileSize: null,
		allowedFileTypes: null,
		...restrictions
	};

	const inputRef = useRef<HTMLInputElement>(null);

	// Détection de la langue : prop > html lang > 'fr' par défaut
	const currentLang = lang || (typeof document !== 'undefined' ? document.documentElement.lang : 'fr') || 'fr';
	const locale = currentLang.startsWith('en') ? en_US : fr_FR;

	const [uppy] = useState(() => {
		const u = new Uppy({
			locale,
			restrictions: mergedRestrictions
		});

		u.use(Compressor);
		u.use(ImageEditor);

		return u;
	});

	useEffect(() => {
		if (onComplete) {
			uppy.on('complete', onComplete);
		}

		if (onError) {
			uppy.on('error', onError);
		}

		const syncToInput = () => {
			if (!inputRef.current) return;

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

			inputRef.current.files = dataTransfer.files;

			// Déclenchement manuel de l'événement change pour les libs de formulaire (Hook Form, etc.)
			inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
		};

		const events = [
			'file-added',
			'file-removed',
			'files-added',
			'file-editor:complete',
			'preprocess-complete',
			'postprocess-complete'
		];

		events.forEach(event => uppy.on(event as any, syncToInput));

		return () => {
			if (onComplete) uppy.off('complete', onComplete);
			if (onError) uppy.off('error', onError);
			events.forEach(event => uppy.off(event as any, syncToInput));
		};
	}, [uppy, onComplete, onError]);

	const isMultiple = mergedRestrictions.maxNumberOfFiles === null || mergedRestrictions.maxNumberOfFiles === undefined || mergedRestrictions.maxNumberOfFiles > 1;

	return (
		<UppyContextProvider uppy={uppy}>
			<div className="file-input__wrapper" id={name}>
				<div className="file-input__content">
					<Dashboard
						uppy={uppy}
						width="100%"
						height={300}
						hideProgressDetails={false}
						hideUploadButton={true}
						proudlyDisplayPoweredByUppy={false}
						locale={{
							strings: locale.strings
						}}
					/>
				</div>
				{name && (
					<input
						ref={inputRef}
						type="file"
						name={isMultiple ? `${name}[]` : name}
						multiple={isMultiple}
						style={{ display: 'none' }}
					/>
				)}
			</div>
		</UppyContextProvider>
	);
};


