/**
 * Détermine le code pays par défaut en fonction de la langue du document.
 * @returns {string} Le code pays (ex: "fr", "gb").
 */
export const getDefaultCountry = (): string => {
	if (typeof document === "undefined") return "fr";
	const lang = document.documentElement.lang.toLowerCase();
	if (lang.startsWith("fr")) return "fr";
	if (lang.startsWith("en")) return "gb";
	return "fr";
};

/**
 * Initialise un observateur pour détecter les changements de langue du site.
 * @param {boolean} initialCountry - Si un pays initial est déjà défini (pour ignorer l'auto-détection).
 * @param {(country: string) => void} callback - Fonction appelée quand le pays change.
 * @returns {MutationObserver | null} L'instance de l'observateur ou null.
 */
export const watchLanguageChange = (
	initialCountry: any,
	callback: (country: string) => void
): MutationObserver | null => {
	if (initialCountry || typeof document === "undefined") return null;

	const observer = new MutationObserver(() => {
		callback(getDefaultCountry());
	});

	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["lang"],
	});

	return observer;
};

/**
 * Supprime visuellement les zéros initiaux du champ input visible, si applicable (ex: "fr").
 * @param {HTMLInputElement} inputElement - L'élément input visible.
 * @param {string} country - Le code du pays sélectionné.
 */
export const removeLeadingZeros = (inputElement: HTMLInputElement, country: string): void => {
	if (country === "fr" && inputElement.value.startsWith("0")) {
		inputElement.value = inputElement.value.replace(/^0+/, "");
	}
};

/**
 * Met à jour la valeur de l'input caché en ajoutant un "0" initial si nécessaire pour le pays (ex: "fr").
 * @param {HTMLInputElement} visibleInput - L'élément input visible.
 * @param {HTMLInputElement} hiddenInput - L'élément input caché qui sera soumis.
 * @param {string} country - Le code du pays sélectionné.
 */
export const updateHiddenInputValue = (
	visibleInput: HTMLInputElement,
	hiddenInput: HTMLInputElement,
	country: string
): void => {
	let val = visibleInput.value;
	if (country === "fr" && val && !val.startsWith("0") && !val.startsWith("+")) {
		val = "0" + val;
	}
	hiddenInput.value = val;
};

/**
 * Formate le numéro en s'assurant qu'il commence par un "0" si le pays le requiert (ex: "fr").
 * @param {string} internationalNumber - Le numéro fourni par intl-tel-input.
 * @param {string} country - Le code du pays sélectionné.
 * @returns {string} Le numéro formaté.
 */
export const formatInternationalNumber = (internationalNumber: string, country: string): string => {
	let val = internationalNumber;
	// Si le numéro est censé être national français mais qu'il manque le 0
	if (country === "fr" && val && !val.startsWith("+") && !val.startsWith("0")) {
		val = "0" + val;
	}
	return val;
};
