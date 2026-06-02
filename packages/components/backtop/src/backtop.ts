/**
 * Initialise le comportement du bouton de retour en haut de page.
 * @function initBacktop
 */
const initBacktop = () => {
	const backtop = document.querySelector('[data-backtop]') as HTMLElement;

	if (backtop) {
		// Gère la visibilité au défilement
		window.addEventListener('scroll', () => {
			if (window.scrollY > 300) {
				backtop.style.opacity = '1';
				backtop.style.visibility = 'visible';
				backtop.style.transform = 'translateY(0)';
			} else {
				backtop.style.opacity = '0';
				backtop.style.visibility = 'hidden';
				backtop.style.transform = 'translateY(20px)';
			}
		});

		// Gère le clic pour remonter
		backtop.addEventListener('click', (e) => {
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		});
	}
};

document.addEventListener('DOMContentLoaded', initBacktop);
