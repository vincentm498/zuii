/**
 * Gère l'événement onKeyDown pour restreindre la saisie numérique (décimaux autorisés).
 * Fonction utilisable avec React ou en Vanilla JS.
 *
 * @param {KeyboardEvent} e - L'événement clavier.
 */
export const handleNumericKeyDown = (e: any) => {
	const controlKeys = ["Backspace", "Delete", "Tab", "Escape", "Enter", "Home", "End", "ArrowLeft", "ArrowRight"];
	const isControlKey = controlKeys.includes(e.key);
	const isNumber = /^[0-9]$/.test(e.key);
	const isSeparator = [".", ","].includes(e.key);
	const isModifier = e.metaKey || e.ctrlKey;

	// Empêcher plusieurs séparateurs
	if (isSeparator) {
		const target = e.target as HTMLInputElement;
		const value = target.value;
		if (value.includes(".") || value.includes(",")) {
			e.preventDefault();
			return;
		}
	}

	if (!isControlKey && !isNumber && !isSeparator && !isModifier) {
		e.preventDefault();
	}
};
