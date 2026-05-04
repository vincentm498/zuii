import Choices from 'choices.js';
import 'flag-icons/css/flag-icons.min.css';

/**
 * Initialise un sélecteur Choices.js générique.
 *
 * @param {HTMLSelectElement} element - L'élément select à transformer.
 * @param {any} config - Options de configuration de Choices.js.
 * @param {(value: string | string[]) => void} onChange - Callback lors du changement.
 * @returns {Choices} L'instance Choices.js.
 */
export const initSelect = (
	element: HTMLSelectElement,
	config: any = {},
	onChange?: (value: string | string[]) => void
): Choices => {
	const selectOptions: any = {
		itemSelectText: '',
		removeItemButton: config.removeItemButton || false,
		searchEnabled: config.searchEnabled !== undefined ? config.searchEnabled : true,
		shouldSort: false,
		placeholder: true,
		placeholderValue: config.placeholderValue || 'Sélectionnez une option',
		...config
	};

	// Gestion du rendu des drapeaux pour la variante 'country'
	if (config.variant === 'country') {
		selectOptions.callbackOnCreateTemplates = (template: any) => {
			const renderContent = (data: any) => {
				if (data.placeholder || !data.customProperties?.flag) return `<span>${data.label}</span>`;
				return `<span class="fi fi-${data.customProperties.flag} select__flag"></span> <span>${data.label}</span>`;
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
		};
	}

	const choices = new Choices(element, selectOptions);

	if (onChange) {
		element.addEventListener('change', () => {
			const value = choices.getValue(true);
			onChange(value);
		});
	}

	return choices;
};
