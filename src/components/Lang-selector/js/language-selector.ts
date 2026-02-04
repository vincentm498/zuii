import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.css';
import 'flag-icons/css/flag-icons.min.css';

/**
 * Interface pour les options de langue.
 */
export interface LanguageOption {
	value: string;
	label: string;
	flag: string;
	selected?: boolean;
}

/**
 * Initialise le sélecteur de langue avec Choices.js.
 *
 * @param {HTMLSelectElement} element - L'élément select à transformer.
 * @param {LanguageOption[]} options - Liste des langues disponibles.
 * @param {(value: string) => void} onChange - Callback appelé lors du changement de langue.
 * @returns {Choices} L'instance de Choices.js.
 */
export const initLanguageSelector = (
	element: HTMLSelectElement,
	options: LanguageOption[],
	onChange?: (value: string) => void
): Choices => {
	// S'assurer que l'élément est vide pour éviter les doublons si Choices est ré-initialisé
	element.innerHTML = '';

	const choices = new Choices(element, {
		choices: options.map(opt => ({
			value: opt.value,
			label: opt.label,
			selected: opt.selected,
			customProperties: {
				flag: opt.flag
			}
		})),
		searchEnabled: false,
		itemSelectText: '',
		shouldSort: false,
		callbackOnCreateTemplates: function(template) {
			const classNames: any = (this as any).config.classNames;
			const itemSelectText: string = (this as any).config.itemSelectText;
			return {
				item: (_: any, data: any) => {
					return template(`
						<div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
							<span class="fi fi-${data.customProperties.flag} lang-selector__flag"></span>
							${data.label}
						</div>
					`) as any;
				},
				choice: (_: any, data: any) => {
					return template(`
						<div class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" role="option">
							<span class="fi fi-${data.customProperties.flag} lang-selector__flag"></span>
							${data.label}
						</div>
					`) as any;
				},
			};
		},
	});

	if (onChange) {
		const handleChange = (event: any) => {
			const value = event.detail.value;
			document.documentElement.lang = value;
			onChange(value);
		};
		element.addEventListener('change', handleChange);

		// Stocker la fonction pour pouvoir la supprimer (optionnel si Choices.destroy() suffit)
		(choices as any)._handleChange = handleChange;
	}

	return choices;
};
