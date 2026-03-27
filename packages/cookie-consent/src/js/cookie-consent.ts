/* eslint-disable no-undef */
import { run } from 'vanilla-cookieconsent';

/**
 * Mapping des classes par sélecteur pour une modale donnée.
 */
interface ModalMapping {
	[selector: string]: string | string[];
}

/**
 * Structure des classes supplémentaires passées à l'initialisation.
 */
interface ExtraClasses {
	consentModal?: ModalMapping;
	preferencesModal?: ModalMapping;
	common?: ModalMapping;
}

/**
 * Ajoute des classes CSS à une liste d'éléments à partir d'un mapping.
 * @param {HTMLElement} container - L'élément parent (la modale)
 * @param {ModalMapping} mapping - Objet { 'sélecteur': 'classe(s)' }
 */
const applyClasses = (container: HTMLElement, mapping: ModalMapping): void => {
	Object.entries(mapping).forEach(([selector, classes]) => {
		const elements = selector === 'root' ? [container] : container.querySelectorAll(selector);
		elements.forEach(el => {
			const classList = Array.isArray(classes) ? classes : [classes];
			(el as HTMLElement).classList.add(...classList.filter(Boolean));
		});
	});
};

/**
 * Initialise le bandeau de consentement des cookies avec support multilingue et classes personnalisables.
 * @param {string} [prefix='cookie-consent'] - Préfixe pour les classes BEM.
 * @param {Record<string, string>} [translations] - Chemins vers les fichiers de traduction JSON.
 * @param {ExtraClasses} [extraClasses={}] - Classes supplémentaires à ajouter par projet.
 *
 * @example
 * initCookieConsent('cookie-consent', undefined, {
 * 	consentModal: {
 * 		'[data-role="all"]': 'my-custom-class',
 * 	}
 * });
 */
export const initCookieConsent = (
	prefix: string = 'cookie-consent',
	translations: Record<string, string> = {
		fr: '/locales/fr.json',
		en: '/locales/en.json'
	},
	extraClasses: ExtraClasses = {}
): void => {
	run({
		guiOptions: {
			consentModal: { layout: 'box', position: 'bottom left', equalWeightButtons: true },
			preferencesModal: { layout: 'box', position: 'right', equalWeightButtons: true }
		},
		onModalReady: ({ modalName, modal }) => {
			const btn = ['button'];
			const accordion = "accordion";

			const common: ModalMapping = {
				'h2': `${prefix}__title`,
				'p': `${prefix}__description`,
				'a': `${prefix}__link`,
				'[data-role="all"]': [...btn, 'button--primary', `${prefix}--button`],
				'[data-role="necessary"]': [...btn, 'button--secondary', `${prefix}--button`],
			};

			const mappings: Record<string, ModalMapping> = {
				consentModal: {
					'root': prefix,
					...common,
					'[data-role="show"]': [...btn, 'button--link', `${prefix}--button`],
				},
				preferencesModal: {
					'root': `${prefix}__preferences`,
					...common,
					'[data-role="save"]': [...btn, 'button--primary', `${prefix}--button`],
					'.section__toggle-wrapper': ['toggle', `${prefix}--toggle`],
					'.pm__close-btn': [...btn, 'button--close', `${prefix}--button`],
					'.pm__section--toggle': [accordion, `${prefix}--accordion`],
					'.pm__section--toggle button': [`${accordion}__button`, `${prefix}-${accordion}--button`],
					'.pm__section-desc-wrapper': [`${accordion}__content`, `${prefix}-${accordion}--content`]
				}
			};

			const currentMapping = { ...(mappings[modalName] || {}) };

			// On fusionne les classes communes du projet AVANT les spécifiques modale
			const additional: ModalMapping = {
				...(extraClasses.common || {}),
				...(extraClasses[modalName as keyof ExtraClasses] as ModalMapping || {})
			};

			Object.entries(additional).forEach(([selector, classes]) => {
				const extra = Array.isArray(classes) ? classes : [classes];
				if (currentMapping[selector]) {
					const base = Array.isArray(currentMapping[selector]) ? currentMapping[selector] : [currentMapping[selector]];
					currentMapping[selector] = [...(base as string[]), ...extra];
				} else {
					currentMapping[selector] = extra;
				}
			});

			applyClasses(modal, currentMapping);
		},
		categories: {
			necessary: { readOnly: true },
			analytics: {}
		},
		language: {
			default: 'fr',
			autoDetect: 'browser',
			translations: translations
		}
	});
};
