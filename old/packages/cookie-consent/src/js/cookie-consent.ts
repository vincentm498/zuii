import * as CookieConsent from 'vanilla-cookieconsent';
import { getDocLang, type ZuiiLang } from '@zuii/core';
import { trads as defaultTrads } from './trads/i18n';

// Exposition globale pour permettre le pilotage de la langue depuis d'autres composants (ex: Language Selector)
(window as any).CookieConsent = CookieConsent;


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
 * @param {Record<string, any>} [translations=defaultTrads] - Objet de traductions (fr, en, es, de).
 * @param {ExtraClasses} [extraClasses={}] - Classes supplémentaires à ajouter par projet.
 * @param {Object} [callbacks={}] - Callbacks onConsent et onChange.
 * @param {string[]} [enabledCategories] - Liste facultative des catégories à activer.
 * @param {ZuiiLang[]} [disabledLangs=[]] - Langues à désactiver.
 */
export const initCookieConsent = (
	prefix: string = 'cookie-consent',
	translations: Record<string, any> = defaultTrads,
	extraClasses: ExtraClasses = {},
	callbacks: {
		onConsent?: (params: { cookie: any }) => void;
		onChange?: (params: { cookie: any, changedCategories: string[] }) => void;
	} = {},
	enabledCategories?: string[],
	disabledLangs: ZuiiLang[] = []
): void => {
	const allCategories = {
		necessary: { readOnly: true },
		functionality: {},
		analytics: {},
		marketing: {}
	};

	// Filtrer les catégories si une liste est fournie
	const categories = enabledCategories
		? Object.fromEntries(
			Object.entries(allCategories).filter(([key]) => enabledCategories.includes(key))
		)
		: allCategories;

	// Filtrer les sections des traductions pour qu'elles correspondent aux catégories sélectionnées
	if (enabledCategories) {
		Object.keys(translations).forEach((lang) => {
			if (translations[lang].preferencesModal?.sections) {
				translations[lang].preferencesModal.sections = translations[lang].preferencesModal.sections.filter(
					(section: any) => !section.linkedCategory || enabledCategories.includes(section.linkedCategory)
				);
			}
		});
	}

	const detectedLang = getDocLang();
	const finalLang = (disabledLangs as string[]).includes(detectedLang) ? 'fr' : detectedLang;

	CookieConsent.run({
		guiOptions: {
			consentModal: { layout: 'box', position: 'bottom left', equalWeightButtons: true },
			preferencesModal: { layout: 'box', position: 'right', equalWeightButtons: true }
		},
		onConsent: callbacks.onConsent,
		onChange: callbacks.onChange,
		onModalReady: ({ modalName, modal }: { modalName: string, modal: HTMLElement }) => {
			const btn = ['button'];
			const accordion = "accordion";

			const common: ModalMapping = {
				'h2': `${prefix}__title`,
				'p': `${prefix}__description`,
				'a': `${prefix}__link`,
				'[data-role="all"]': [...btn, 'button--primary', `${prefix}--button`],
				'[data-role="necessary"]': [...btn, 'button--secondary', `${prefix}--button`],
				'.cm__body': `${prefix}__body`,
				'.cm__footer': `${prefix}__footer`,
				'.pm__header': `${prefix}__header`,
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

			// Injection automatique du wrapper .button__content pour les boutons
			modal.querySelectorAll('.button').forEach(btn => {
				if (!btn.querySelector('.button__content')) {
					const content = document.createElement('div');
					content.className = 'button__content';
					// Transfert de tous les nœuds enfants (texte, icônes, etc.) dans le nouveau wrapper
					while (btn.firstChild) {
						content.appendChild(btn.firstChild);
					}
					btn.appendChild(content);
				}
			});
		},
		categories,
		language: {
			default: finalLang,
			translations: translations
		}
	});
};

/**
 * Change la langue de la modale de consentement.
 * @param {string} lang - Code de la langue (ex: 'fr', 'en').
 */
export const setCookieConsentLanguage = (lang: string) => {
	CookieConsent.setLanguage(lang);
};

/**
 * Affiche la modale de préférences.
 */
export const showCookieConsentPreferences = () => {
	CookieConsent.showPreferences();
};

