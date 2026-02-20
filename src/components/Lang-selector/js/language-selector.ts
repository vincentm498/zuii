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
 * @param {boolean} searchEnabled - Active la recherche.
 * @param {string} placeholder - Texte affiché quand aucune option n'est sélectionnée.
 * @returns {Choices} L'instance de Choices.js.
 */
export const initLanguageSelector = (
	element: HTMLSelectElement,
	options: LanguageOption[],
	onChange?: (value: string) => void,
	searchEnabled: boolean = false,
	placeholder: string = ''
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
		searchEnabled: searchEnabled,
		itemSelectText: '',
		shouldSort: false,
		placeholder: !!placeholder,
		placeholderValue: placeholder,
		callbackOnCreateTemplates: (template) => {
			const renderContent = (data: any) => {
				if (data.placeholder) return `<span>${data.label}</span>`;
				return `<span class="fi fi-${data.customProperties.flag} lang-selector__flag"></span>${data.customProperties.label ? ` ${data.label}` : ''}`;
			};

			return {
				item: (conf: any, data: any) => {
					const { item, highlightedState, itemSelectable, placeholder } = conf.classNames;
					const stateClass = data.highlighted ? highlightedState : itemSelectable;
					const activeAttr = data.active ? 'aria-selected="true"' : '';
					const disabledAttr = data.disabled ? 'aria-disabled="true"' : '';
					const placeholderClass = data.placeholder ? placeholder : '';

					return template(`
						<div class="${item} ${stateClass} ${placeholderClass}" data-item data-id="${data.id}" data-value="${data.value}" ${activeAttr} ${disabledAttr}>
							${renderContent(data)}
						</div>`.trim()) as any;
				},
				choice: (conf: any, data: any) => {
					const { item, itemChoice, itemDisabled, itemSelectable, placeholder } = conf.classNames;
					const stateClass = data.disabled ? itemDisabled : itemSelectable;
					const choiceAttr = data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable';
					const placeholderClass = data.placeholder ? placeholder : '';

					return template(`
						<div class="${item} ${itemChoice} ${stateClass} ${placeholderClass}" data-select-text="${conf.itemSelectText}" data-choice ${choiceAttr} data-id="${data.id}" data-value="${data.value}" role="option">
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
