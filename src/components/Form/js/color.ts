import Pickr from '@simonwep/pickr';

/**
 * Initialise une instance de Pickr pour la sélection de couleur.
 * 
 * @param {HTMLElement} element - L'élément sur lequel attacher le picker.
 * @param {string} defaultValue - La couleur par défaut (HEX).
 * @param {string[]} swatches - Liste des couleurs prédéfinies.
 * @param {(color: string) => void} onChange - Callback appelé lors du changement de couleur.
 * @returns {Pickr} L'instance de Pickr créée.
 */
export const initColorPicker = (
	element: HTMLElement,
	defaultValue: string,
	swatches: string[],
	onChange: (color: string) => void
): Pickr => {
	const pickr = new Pickr({
		el: element,
		useAsButton: true,
		theme: 'nano',
		i18n: {
			'btn:save': 'Enregistrer',
			'btn:cancel': 'Annuler',
			'btn:clear': 'Vider',
		},
		swatches: swatches,
		default: defaultValue || '#ffffff',
		components: {
			preview: true,
			opacity: false,
			hue: true,
			interaction: {
				hex: true,
				rgba: false,
				hsla: false,
				hsva: false,
				cmyk: false,
				input: true,
				save: false
			}
		}
	});

	pickr.on('change', (color: any) => {
		const hexColor = color.toHEXA().toString();
		onChange(hexColor);
	});

	return pickr;
};
