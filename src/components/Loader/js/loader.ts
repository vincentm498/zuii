/**
 * Options pour le composant Loader.
 */
export interface LoaderOptions {
	/**
	 * Message à afficher sous le loader.
	 */
	message?: string;
	/**
	 * Taille du loader.
	 */
	size?: 'sm' | 'md' | 'lg';
	/**
	 * Variante de style du loader.
	 */
	variant?: 'dots' | 'spinner' | 'pulse' | 'quad' | 'svg';
	/**
	 * Source du SVG (chaîne SVG ou chemin).
	 */
	src?: string;
}

/**
 * Logique JavaScript pour le composant Loader.
 *
 * @param {HTMLElement} element - L'élément DOM du loader.
 * @param {LoaderOptions} options - Les options de configuration.
 */
export const initLoader = (element: HTMLElement, options: LoaderOptions = {}) => {
	if (!element) return;

	const { size = 'md' } = options;
	element.setAttribute('data-size', size);
};

