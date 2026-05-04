import intlTelInput from "intl-tel-input";
import Choices from "choices.js";


/**
 * Calcule la nouvelle valeur après incrémentation.
 *
 * @param {number} value - Valeur actuelle.
 * @param {number} step - Pas d'incrémentation.
 * @param {number} max - Valeur maximale optionnelle.
 * @returns {number} La nouvelle valeur.
 */
export const calculateIncrement = (value: number, step: number = 1, max?: number): number => {
	const newValue = value + step;
	if (max !== undefined && newValue > max) return value;
	return newValue;
};

/**
 * Calcule la nouvelle valeur après décrémentation.
 *
 * @param {number} value - Valeur actuelle.
 * @param {number} step - Pas d'incrémentation.
 * @param {number} min - Valeur minimale optionnelle.
 * @returns {number} La nouvelle valeur.
 */
export const calculateDecrement = (value: number, step: number = 1, min?: number): number => {
	const newValue = value - step;
	if (min !== undefined && newValue < min) return value;
	return newValue;
};

/**
 * Initialise les inputs de type number avec les boutons personalisés pour du HTML classique.
 *
 * @param {string} selector - Sélecteur CSS des conteneurs d'input number (ex: ".number-input").
 */
export const initNumberInputs = (selector: string = '.number-input') => {
	const containers = document.querySelectorAll(selector);

	containers.forEach(container => {
		const input = container.querySelector('input[type="number"]') as HTMLInputElement;
		const minusBtn = container.querySelector('.number-input__addon:first-child');
		const plusBtn = container.querySelector('.number-input__addon:last-child');

		if (!input) return;

		const step = parseFloat(input.step) || 1;
		const min = input.min !== "" ? parseFloat(input.min) : undefined;
		const max = input.max !== "" ? parseFloat(input.max) : undefined;

		if (minusBtn) {
			minusBtn.addEventListener('click', () => {
				const currentValue = parseFloat(input.value) || 0;
				input.value = calculateDecrement(currentValue, step, min).toString();
				input.dispatchEvent(new Event('change', { bubbles: true }));
			});
		}

		if (plusBtn) {
			plusBtn.addEventListener('click', () => {
				const currentValue = parseFloat(input.value) || 0;
				input.value = calculateIncrement(currentValue, step, max).toString();
				input.dispatchEvent(new Event('change', { bubbles: true }));
			});
		}
	});
};

/**
 * Initialise les inputs de type tel avec intl-tel-input pour du HTML classique.
 *
 * @param {string} selector - Sélecteur CSS des inputs tel (ex: 'input[type="tel"]').
 */
export const initTelInputs = (selector: string = 'input[type="tel"]') => {
	const inputs = document.querySelectorAll(selector);

	inputs.forEach(input => {
		intlTelInput(input as HTMLInputElement, {
			initialCountry: "fr",
			loadUtils: () => import("intl-tel-input/utils"),
			separateDialCode: true,
		});
	});
};

/**
 * Initialise les toggles de visibilité du mot de passe pour du HTML classique.
 *
 * @param {string} selector - Sélecteur CSS des boutons toggle (ex: '.password-toggle').
 */
export const initPasswordToggles = (selector: string = '.password-input__toggle') => {
	const toggles = document.querySelectorAll(selector);

	toggles.forEach(toggle => {
		toggle.addEventListener('click', () => {
			const container = toggle.closest('.password-input');
			if (!container) return;

			const input = container.querySelector('input') as HTMLInputElement;
			const icon = toggle.querySelector('i');

			if (input) {
				const isPassword = input.type === 'password';
				input.type = isPassword ? 'text' : 'password';

				if (icon) {
					icon.className = isPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
				}
			}
		});
	});
};

/**
 * Initialise la validation de correspondance de mot de passe pour du HTML classique.
 *
 * @param {string} firstSelector - Sélecteur du mot de passe initial.
 * @param {string} secondSelector - Sélecteur de la confirmation.
 */
export const initPasswordConfirm = (firstSelector: string, secondSelector: string) => {
	const firstInput = document.querySelector(firstSelector) as HTMLInputElement;
	const secondInput = document.querySelector(secondSelector) as HTMLInputElement;

	if (!firstInput || !secondInput) return;

	const validate = () => {
		const match = firstInput.value === secondInput.value;
		if (secondInput.value === "") {
			secondInput.classList.remove('is-invalid', 'is-valid');
		} else {
			secondInput.classList.toggle('is-invalid', !match);
			secondInput.classList.toggle('is-valid', match);
		}
	};

	firstInput.addEventListener('input', validate);
	secondInput.addEventListener('input', validate);
};

/**
 * Initialise l'affichage de la valeur pour les inputs range en HTML classique.
 *
 * @param {string} selector - Sélecteur des conteneurs range (ex: '.range-input').
 */
export const initRangeInputs = (selector: string = '.range-input') => {
	const containers = document.querySelectorAll(selector);

	containers.forEach(container => {
		const input = container.querySelector('input[type="range"]') as HTMLInputElement;
		const badge = container.querySelector('.badge');

		if (input && badge) {
			input.addEventListener('input', () => {
				badge.textContent = input.value;
			});
		}
	});
};

/**
 * Initialise le comportement des inputs file pour le HTML classique.
 *
 * @param {string} selector - Sélecteur des conteneurs file (ex: '.file-input').
 */
export const initFileInputs = (selector: string = '.file-input') => {
	const containers = document.querySelectorAll(selector);

	containers.forEach(container => {
		const input = container.querySelector('input[type="file"]') as HTMLInputElement;
		const wrapper = container.querySelector('.file-input__wrapper');
		// Note: La preview nécessite une gestion plus complexe en Vanilla (DOM dynamique),
		// ici on se contente de gérer les classes de drag.

		if (input && wrapper) {
			input.addEventListener('dragover', () => wrapper.classList.add('file-input__wrapper--dragover'));
			input.addEventListener('dragleave', () => wrapper.classList.remove('file-input__wrapper--dragover'));
			input.addEventListener('drop', () => wrapper.classList.remove('file-input__wrapper--dragover'));

			input.addEventListener('change', () => {
				const fileName = input.files?.[0]?.name;
				console.log('File selected:', fileName);
				// Possibilité d'étendre ici pour afficher le nom du fichier dans le DOM
			});
		}
	});
};

/**
 * Initialise Choices.js pour les éléments select en HTML classique.
 *
 * @param {string} selector - Sélecteur des éléments select (ex: 'select.choices-select').
 */
export const initSelects = (selector: string = 'select.choices-select') => {
	const selects = document.querySelectorAll(selector);

	selects.forEach(select => {
		new Choices(select as HTMLSelectElement, {
			itemSelectText: '',
			searchEnabled: true,
			shouldSort: false,
			placeholder: true,
			placeholderValue: select.getAttribute('placeholder') || 'Sélectionnez une option',
		});
	});
};

/**
 * Initialise le composant Form.
 */
export const initForm = () => {
	initNumberInputs();
	initTelInputs();
	initPasswordToggles();
	initRangeInputs();
	initFileInputs();
	initSelects();
};
