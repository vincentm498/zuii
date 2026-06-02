import flatpickr from "flatpickr";
import { French } from "flatpickr/dist/l10n/fr.js";

/**
 * Map des locales supportées pour Flatpickr.
 */
export const localeMap = {
	fr: French,
	en: "default",
};

/**
 * Détermine le séparateur de plage en fonction de la locale.
 *
 * @param {string} localeCode - Le code de la locale (ex: 'fr', 'en').
 * @returns {string} Le séparateur utilisé pour les plages de dates.
 */
export const getRangeSeparator = (localeCode: string): string => {
	const selectedLocale = localeMap[localeCode as keyof typeof localeMap];
	return (selectedLocale as any)?.rangeSeparator || " to ";
};

/**
 * Initialise une instance de Flatpickr.
 *
 * @param {HTMLElement} element - L'élément sur lequel attacher le picker (input caché).
 * @param {any} options - Options de configuration de Flatpickr.
 * @param {HTMLElement | null} positionElement - Élément d'ancrage pour le positionnement.
 * @param {(dateStr: string) => void} onChange - Callback appelé lors du changement de date.
 * @returns {any} L'instance de Flatpickr.
 */
export const initDatePicker = (
	element: HTMLElement,
	options: any = {},
	positionElement: HTMLElement | null = null,
	onChange: (dateStr: string) => void
): any => {
	const defaultOptions = {
		dateFormat: "d/m/Y",
		altFormat: "Y-m-d",
		locale: "en",
	};

	const memoOptions = {
		...defaultOptions,
		...options,
		locale: localeMap[options.locale as keyof typeof localeMap] || "en",
	};

	return flatpickr(element, {
		...memoOptions,
		allowInput: true,
		altInput: false,
		positionElement: positionElement || undefined,
		static: true,
		onChange: (_selectedDates, dateStr) => {
			onChange(dateStr);
		},
	});
};

/**
 * Calcule la valeur formatée pour l'input caché (soumission de formulaire).
 * Supporte les dates simples et les plages de dates.
 *
 * @param {string} inputVal - La valeur actuelle affichée dans l'input visible.
 * @param {string} separator - Le séparateur de plage utilisé.
 * @param {any} flatpickrInstance - L'instance active de Flatpickr.
 * @returns {string} La valeur formatée pour la soumission.
 */
export const formatHiddenDateValue = (
	inputVal: string,
	separator: string,
	flatpickrInstance: any
): string => {
	if (!inputVal || !flatpickrInstance) return '';

	try {
		const [startStr, endStr] = inputVal.split(separator);
		const { dateFormat, altFormat } = flatpickrInstance.config;

		const startDate = startStr ? flatpickr.parseDate(startStr, dateFormat) : null;
		const endDate = endStr ? flatpickr.parseDate(endStr, dateFormat) : null;

		const formattedStart = startDate ? flatpickr.formatDate(startDate, altFormat) : '';
		const formattedEnd = endDate ? flatpickr.formatDate(endDate, altFormat) : '';

		return formattedStart && formattedEnd
			? `${formattedStart} / ${formattedEnd}`
			: (formattedStart ? formattedStart : '');
	} catch {
		return '';
	}
};
