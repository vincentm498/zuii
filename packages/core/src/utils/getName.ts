/**
 * Options pour l'injection dynamique de classes BEM.
 */
interface InjectOptions {
	/**
	 * Nom de base servant de préfixe BEM (ex: 'cavaliers').
	 */
	name: string;

	/**
	 * Liste de sélecteurs CSS à cibler, séparés par des virgules (ex: '.container, .form').
	 * Chaque élément trouvé recevra une classe composée : {base}__{selecteur}.
	 */
	selector: string;

	/**
	 * Préfixe global optionnel à ajouter avant le nom de base.
	 * @default ''
	 */
	classPrefix?: string;

	/**
	 * Si vrai, applique aussi le nom de base comme classe simple sur l'élément <body>.
	 * @default false
	 */
	targetBody?: boolean;
}

/**
 * Injecte automatiquement des classes CSS BEM dans le DOM pour faciliter le styling spécifique par page.
 *
 * ### Démonstration :
 * ```typescript
 * // Si vous appelez la fonction ainsi :
 * injectDynamicPageClass({
 *   name: 'cavaliers',
 *   selector: '.container, .group, .datagrid'
 * });
 * 
 * // Résultat dans le DOM :
 * // <div class="container cavaliers__container">...</div>
 * // <div class="group cavaliers__group">...</div>
 * // <div class="datagrid cavaliers__datagrid">...</div>
 * ```
 * 
 * ### Fonctionnement :
 * 1. Détermine le **nom de base** (via l'option `name`).
 * 2. Pour chaque **sélecteur** fourni (séparé par des virgules) :
 *    - Trouve tous les éléments correspondants.
 *    - Génère un suffixe propre en retirant les symboles CSS (`.` ou `#`).
 *    - Applique la classe générée : `{base}__{suffixe}`.
 *
 * @param {InjectOptions} options - Configuration de l'injection.
 */
export const injectDynamicPageClass = ({
	name,
	selector,
	classPrefix = '',
	targetBody = false
}: InjectOptions): void => {
	// 1. Détermination du nom de base (Prefixe BEM)
	if (!name) {
		throw new Error('Name is required');
	}
	if (!selector) {
		throw new Error('Selector is required');
	}
	const fullPrefix = classPrefix ? `${classPrefix}-${name}` : name;

	/**
	 * Helper interne pour appliquer une classe proprement.
	 */
	const apply = (el: Element, rawSelector: string) => {
		// Nettoyage du sélecteur pour en faire un suffixe BEM propre (retrait du . ou #)
		const suffix = rawSelector.replace(/^[.#]/, '').trim();
		const className = suffix ? `${fullPrefix}__${suffix}` : fullPrefix;

		if (!el.classList.contains(className)) {
			el.classList.add(className);
		}
	};

	// 2. Application sur le Body (Global)
	if (targetBody) {
		if (!document.body.classList.contains(fullPrefix)) {
			document.body.classList.add(fullPrefix);
		}
	}

	// 3. Application sur les sélecteurs cibles
	// On split par virgule pour gérer les listes de sélecteurs nativement.
	selector.split(',').forEach(s => {
		const targetSelector = s.trim();
		if (!targetSelector) return;

		const elements = document.querySelectorAll(targetSelector);
		elements.forEach(el => apply(el, targetSelector));
	});
};
