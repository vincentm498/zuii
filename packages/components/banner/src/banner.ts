import { Splide } from '@splidejs/splide';
import '@splidejs/splide/css';

/**
 * Initialise le comportement de fermeture sur une bannière.
 * @param {HTMLElement} banner - L'élément banner à initialiser.
 */
const initBanner = (banner: HTMLElement) => {
	if (banner.dataset.bannerInit) return;
	banner.dataset.bannerInit = 'true'; // On marque tout de suite pour éviter les doubles appels

	// Gestion du bouton de fermeture
	const closeButton = banner.querySelector('[data-banner-close]');
	if (closeButton) {
		closeButton.addEventListener('click', () => {
			banner.classList.add('banner--closing');

			banner.addEventListener('animationend', () => {
				banner.style.display = 'none';
			}, { once: true });
		});
	}

	// Gestion du Slider (Splide)
	if (banner.classList.contains('banner--slider')) {
		const track = banner.querySelector('.splide__track');
		const list = banner.querySelector('.splide__list');

		if (track && list) {
			const splide = new Splide(banner, {
				type: 'loop',
				autoplay: true,
				interval: 5000,
				pauseOnHover: true,
				arrows: false,
				pagination: false
			});

			setTimeout(() => {
				if (banner.isConnected) {
					splide.mount();
				}
			}, 50);
		}
	}

};



/**
 * Initialise toutes les bannières présentes et observe les nouveaux ajouts.
 */
const initBanners = () => {
	const selector = '.banner';

	document.querySelectorAll(selector).forEach(el => initBanner(el as HTMLElement));

	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node instanceof HTMLElement) {
					if (node.matches(selector)) {
						initBanner(node);
					}
					node.querySelectorAll(selector).forEach(el => initBanner(el as HTMLElement));
				}
			});
		});
	});

	observer.observe(document.body, { childList: true, subtree: true });
};

// Exécution
if (typeof document !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initBanners);
	} else {
		initBanners();
	}
}
