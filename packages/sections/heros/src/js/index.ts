import { initVideo } from '@zuii/video';

/**
 * Initialise les sections Heros.
 * Cette fonction gère notamment les vidéos en arrière-plan via le package @zuii/video.
 */
export const initHeros = () => {
	// Les Heros vidéo utilisent le système de @zuii/video
	// qui gère déjà l'initialisation automatique via MutationObserver
	initVideo();
};

// Auto-initialisation si on est dans un environnement navigateur
if (typeof window !== 'undefined') {
	initHeros();
}
