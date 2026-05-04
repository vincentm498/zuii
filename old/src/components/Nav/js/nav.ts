/**
 * Logique JavaScript pour le composant Nav.
 * Ajoute la classe nav__item--active à l'élément correspondant à la page courante.
 */
export const initNav = () => {
	const currentPath = window.location.pathname;
	const navItems = document.querySelectorAll('.nav__item');

	navItems.forEach(item => {
		const link = item.querySelector('a');
		if (link) {
			const href = link.getAttribute('href');
			if (href === currentPath) {
				item.classList.add('nav__item--active');
			} else {
				item.classList.remove('nav__item--active');
			}
		}
	});
};
