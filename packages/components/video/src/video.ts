import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

/**
 * Initialise le lecteur Plyr sur un élément.
 * @param {HTMLElement} element - L'élément (video ou div) à transformer en lecteur Plyr.
 */
const initVideoElement = (element: HTMLElement) => {
	if (element.dataset.videoInit) return;

	const isAutoplay = element.getAttribute('data-plyr-autoplay') !== 'false';

	// Configuration de Plyr
	new Plyr(element, {
		controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
		hideControls: true,
		resetOnEnd: true,
		autoplay: isAutoplay,
		muted: isAutoplay, // On ne met en sourdine que si c'est en autoplay
		loop: { active: isAutoplay }
	});

	element.dataset.videoInit = 'true';
};


/**
 * Initialise toutes les vidéos présentes et observe les nouveaux ajouts.
 */
const initVideos = () => {
	// Sélectionne les balises video et les conteneurs Plyr personnalisés
	const selector = 'video, .js-player';

	document.querySelectorAll(selector).forEach(el => initVideoElement(el as HTMLElement));

	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node instanceof HTMLElement) {
					if (node.matches(selector)) {
						initVideoElement(node);
					}
					node.querySelectorAll(selector).forEach(el => initVideoElement(el as HTMLElement));
				}
			});
		});
	});

	observer.observe(document.body, { childList: true, subtree: true });
};


// Exécution
if (typeof document !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initVideos);
	} else {
		initVideos();
	}
}


