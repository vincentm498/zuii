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
