/**
 * Génère les configurations de plateforme pour une destination donnée
 *
 * @param {string} buildPath - Chemin de sortie des fichiers
 */
export const getPlatforms = (buildPath) => ({
	scss: {
		transforms: [
			'attribute/cti',
			'name/kebab',
			'size/rem',
			'color/css',
			'fontFamily/css',
			'shadow/css/shorthand'
		],
		buildPath,
		files: [{
			destination: '_tokens.scss',
			format: 'scss/variables-with-map'
		}]
	},
	css: {
		transforms: [
			'attribute/cti',
			'name/kebab',
			'size/rem',
			'color/css',
			'fontFamily/css',
			'shadow/css/shorthand'
		],
		buildPath,
		files: [{
			destination: 'tokens.css',
			format: 'css/custom-format'
		}]
	},
	ts: {
		transforms: [
			'attribute/cti',
			'name/constant',
			'size/rem',
			'color/hex'
		],
		buildPath,
		files: [
			{
				destination: 'tokens.ts',
				format: 'javascript/structured-object'
			},
		]
	}
});
