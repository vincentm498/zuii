import Swal from 'sweetalert2/dist/sweetalert2.js';
import type { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

/**
 * Type de variante pour le composant Alert.
 */
export type AlertVariant = undefined | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

/**
 * Options étendues pour la fonction fireAlert.
 */
export interface FireAlertOptions extends Omit<SweetAlertOptions, 'icon' | 'title' | 'html' | 'confirmButtonText' | 'cancelButtonText' | 'denyButtonText'> {
	icon?: string;
	variant?: AlertVariant;
	dismissible?: boolean;
	title?: any;
	html?: any;
	confirmButtonText?: any;
	cancelButtonText?: any;
	denyButtonText?: any;
}

/**
 * Génère les options de configuration pour SweetAlert2 basées sur les paramètres de l'alerte.
 *
 * @param {FireAlertOptions} options - Les options de l'alerte.
 * @returns {SweetAlertOptions} Les options formatées pour SweetAlert2.
 */
export const getAlertOptions = (options: FireAlertOptions): SweetAlertOptions => {
	const {
		icon,
		customClass,
		iconHtml,
		variant ,
		dismissible = false,
		...rest
	} = options;

	// Liste des icônes standards de SweetAlert2
	const standardIcons = ['success', 'error', 'warning', 'info', 'question'];
	const isStandardIcon = icon && standardIcons.includes(icon);

	// Si l'icône n'est pas standard, on l'utilise comme icône personnalisée
	const finalIconHtml = !isStandardIcon && icon
		? `<span class="icon icon--size-3xl"><i class="${icon}"></i></span>`
		: iconHtml;

	return {
		icon: isStandardIcon ? (icon as any) : undefined,
		iconHtml: finalIconHtml,
		...rest,
		buttonsStyling: false,
		showCloseButton: dismissible,
		closeButtonHtml: '<span aria-hidden="true"><i class="icon icon-x"></i></span>',
		closeButtonAriaLabel: 'Fermer',
		customClass: {
			actions: 'group',
			popup: `alert ${variant ? `alert--${variant}` : ''} ${dismissible ? 'alert--dismissible' : ''} ${
				customClass?.popup || ''
			}`.trim(),
			title: `alert__heading ${customClass?.title || ''}`.trim(),
			closeButton: `btn btn-transparent btn--close alert__close ${customClass?.closeButton || ''}`.trim(),
			confirmButton: `btn btn-${variant === 'danger' ? 'danger' : variant} ${customClass?.confirmButton || ''}`.trim(),
			cancelButton: `btn btn-secondary ${customClass?.cancelButton || ''}`.trim(),
			...customClass,
		},
	} as SweetAlertOptions;
};

/**
 * Affiche une alerte SweetAlert2 avec le style personnalisé de la bibliothèque.
 *
 * @param {FireAlertOptions} options - Les options de configuration.
 * @returns {Promise<SweetAlertResult>} Le résultat de l'alerte.
 */
export const fireAlert = (options: FireAlertOptions): Promise<SweetAlertResult> => {
	return Swal.fire(getAlertOptions(options));
};

/**
 * Ferme l'alerte actuellement ouverte.
 */
export const closeAlert = (): void => {
	Swal.close();
};

/**
 * Logique JavaScript pour le composant Alert.
 * Initialise les comportements si nécessaire.
 */
export const initAlert = (): void => {
	// Logique d'initialisation globale pour les alertes si nécessaire
};
