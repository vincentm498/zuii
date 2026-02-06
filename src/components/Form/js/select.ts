import Choices from 'choices.js';

/**
 * Initialise un sélecteur Choices.js générique.
 *
 * @param {HTMLSelectElement} element - L'élément select à transformer.
 * @param {any} options - Options de configuration de Choices.js.
 * @param {(value: string | string[]) => void} onChange - Callback lors du changement.
 * @returns {Choices} L'instance Choices.js.
 */
export const initSelect = (
	element: HTMLSelectElement,
	config: any = {},
	onChange?: (value: string | string[]) => void
): Choices => {
	const choices = new Choices(element, {
		itemSelectText: '',
		removeItemButton: config.removeItemButton || false,
		searchEnabled: config.searchEnabled !== undefined ? config.searchEnabled : true,
		shouldSort: false,
		placeholder: true,
		placeholderValue: config.placeholderValue || 'Sélectionnez une option',
		...config
	});

	if (onChange) {
		element.addEventListener('change', (event: any) => {
			const value = event.detail.value;
			onChange(value);
		});
	}

	return choices;
};
