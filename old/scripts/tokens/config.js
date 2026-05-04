import { transforms } from './hooks/transforms.js';
import { formats } from './hooks/formats.js';
import { getPlatforms } from './platforms.js';

/**
 * Hooks partagés (transformations et formats) pour toutes les sources de tokens
 */
const hooks = {
	transforms,
	formats
};

/**
 * Génère les configurations Style Dictionary pour les chemins de tokens fournis
 * @param {string[]} paths - Tableau de chemins vers les dossiers de tokens
 * @param {string} outputPath - Chemin de sortie pour les fichiers générés (défaut: 'src/core/styles/')
 * @returns {Array} Tableau de configurations Style Dictionary
 */
export const getConfigs = (paths = ['tokens'], outputPath = 'src/core/styles/') => {
	// S'assurer que outputPath se termine par un slash
	const buildPath = outputPath.endsWith('/') ? outputPath : `${outputPath}/`;

	return paths.map(path => ({
		hooks,
		source: [`${path}/**/*.json`],
		platforms: getPlatforms(buildPath)
	}));
};

// Export par défaut pour compatibilité
export default getConfigs();

