import Choices from 'choices.js';
import 'flag-icons/css/flag-icons.min.css';

/**
 * Interface pour les options de langue.
 */
export interface LanguageOption {
	value: string;
	label?: string;
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
			label: opt.label || '',
			selected: opt.selected,
			customProperties: { flag: opt.flag, label: opt.label }
		})),
		searchEnabled: false,
		itemSelectText: '',
		shouldSort: false,
		callbackOnCreateTemplates: (template) => {
			const renderContent = (data: any) =>
				`<span class="fi fi-${data.customProperties.flag} lang-selector__flag"></span>${data.customProperties.label ? ` ${data.label}` : ''}`;

			return {
				item: (conf: any, data: any) => {
					const { item, highlightedState, itemSelectable } = conf.classNames;
					const stateClass = data.highlighted ? highlightedState : itemSelectable;
					const activeAttr = data.active ? 'aria-selected="true"' : '';
					const disabledAttr = data.disabled ? 'aria-disabled="true"' : '';

					return template(`
						<div class="${item} ${stateClass}" data-item data-id="${data.id}" data-value="${data.value}" ${activeAttr} ${disabledAttr}>
							${renderContent(data)}
						</div>`.trim()) as any;
				},
				choice: (conf: any, data: any) => {
					const { item, itemChoice, itemDisabled, itemSelectable } = conf.classNames;
					const stateClass = data.disabled ? itemDisabled : itemSelectable;
					const choiceAttr = data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable';

					return template(`
						<div class="${item} ${itemChoice} ${stateClass}" data-select-text="${conf.itemSelectText}" data-choice ${choiceAttr} data-id="${data.id}" data-value="${data.value}" role="option">
							${renderContent(data)}
						</div>`.trim()) as any;
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
