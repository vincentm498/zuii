/**
 * Classe de base du composant Menu.
 */
const BASE_CLASS = "menu";

/**
 * Initialise le menu mobile : gestion du toggle burger, overlay et fermeture clavier.
 *
 * @param {HTMLElement} menuElement - L'élément racine `.menu`.
 */
export const initMenu = (menuElement: HTMLElement): (() => void) => {
	const toggle = menuElement.querySelector<HTMLButtonElement>(`.${BASE_CLASS}__toggle`);
	const mobileNav = menuElement.querySelector<HTMLElement>(`.${BASE_CLASS}__mobile-nav`);
	let overlay: HTMLElement | null = null;
	let isOpen = false;

	/**
	 * Met à jour les classes et attributs en fonction de l'état ouvert/fermé.
	 */
	const updateState = () => {
		if (!toggle || !mobileNav) return;

		toggle.classList.toggle(`${BASE_CLASS}__toggle--open`, isOpen);
		toggle.setAttribute('aria-expanded', String(isOpen));
		toggle.setAttribute('aria-label', isOpen ? 'close menu' : 'open menu');

		mobileNav.classList.toggle(`${BASE_CLASS}__mobile-nav--open`, isOpen);

		document.body.style.overflow = isOpen ? 'hidden' : '';

		if (isOpen && !overlay) {
			overlay = document.createElement('div');
			overlay.className = `${BASE_CLASS}__overlay`;
			overlay.setAttribute('aria-hidden', 'true');
			overlay.addEventListener('click', closeMenu);
			menuElement.insertBefore(overlay, mobileNav);
		} else if (!isOpen && overlay) {
			overlay.removeEventListener('click', closeMenu);
			overlay.remove();
			overlay = null;
		}
	};

	/**
	 * Ouvre ou ferme le menu mobile.
	 */
	const toggleMenu = () => {
		isOpen = !isOpen;
		updateState();
	};

	/**
	 * Ferme le menu mobile.
	 */
	const closeMenu = () => {
		isOpen = false;
		updateState();
	};

	/**
	 * Gestionnaire de la touche Escape.
	 * @param {KeyboardEvent} e - L'événement clavier.
	 */
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeMenu();
		}
	};

	// Attachement des listeners
	toggle?.addEventListener('click', toggleMenu);
	document.addEventListener('keydown', handleKeyDown);

	/**
	 * Fonction de nettoyage pour retirer les listeners.
	 * @returns {void}
	 */
	const destroy = (): void => {
		toggle?.removeEventListener('click', toggleMenu);
		document.removeEventListener('keydown', handleKeyDown);
		if (overlay) {
			overlay.removeEventListener('click', closeMenu);
			overlay.remove();
		}
		document.body.style.overflow = '';
	};

	return destroy;
};
