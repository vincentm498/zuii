import { hexToRgb } from '../utils/color.js';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import { calcAPCA } from 'apca-w3';

extend([mixPlugin]);

/**
 * Formats personnalisés Style Dictionary
 */
export const formats = {
	/**
	 * Format SCSS avec maps imbriquées
	 */
	'scss/variables-with-map': ({ dictionary }) => {
		const processMap = (obj, depth = 0) => {
			const indent = '  '.repeat(depth + 1);
			let output = '';
			if (obj.hasOwnProperty('value')) return `(${obj.value})`;
			const keys = Object.keys(obj).filter(key =>
				key !== 'original' && key !== 'filePath' && key !== 'isSource' &&
				key !== 'path' && key !== 'name' && key !== 'attributes' && key !== 'modify'
			);
			if (keys.length === 0) return '()';
			output += '(\n';
			keys.forEach(key => {
				const value = obj[key];
				output += `${indent}"${key}": ${processMap(value, depth + 1)},\n`;
			});
			output += `${'  '.repeat(depth)})`;
			return output;
		};
		let output = `/**\n * Auto-generated\n */\n`;
		Object.keys(dictionary.tokens).forEach(category => {
			const mapContent = processMap(dictionary.tokens[category]);
			output += `\n$${category}: ${mapContent};\n`;
		});
		return output;
	},
	/**
	 * Format CSS personnalisé avec variations automatiques pour Bootstrap
	 */
	'css/custom-format': ({ dictionary }) => {
		let output = `/**\n * Auto-generated\n */\n\n:root {\n`;
		output += dictionary.allTokens
			.filter(token => token.isSource)
			.map(token => {
				let name = token.name.replace('color-', '').replace('brands-', '').replace('-alias', '');
				let tokenOutput = `  --${name}: ${token.value};`;

				// Pour les couleurs de base (grayscale ou utilitaires simples)
				if (token.path.includes('color') && !name.includes('emphasis') && !name.includes('subtle') && !name.includes('gray')) {
					const rgb = hexToRgb(token.value);
					if (rgb) tokenOutput += `\n  --${name}-rgb: ${rgb};`;
				}

				// Pour les couleurs de marque (brands)
				if (token.path.includes('brands') && token.value.startsWith('#')) {
					const rgb = hexToRgb(token.value);
					if (rgb) {
						tokenOutput += `\n  --${name}-rgb: ${rgb};`;

						const variations = token.original?.variations;
						const mixPercent = token.original?.mixPercent;

						// Gestion du DARK
						let darkValue;
						if (variations?.dark) {
							darkValue = variations.dark;
						} else {
							const mixPercentDark = mixPercent?.dark ?? 70;
							// On simule le color-mix(var(--black) X%)
							darkValue = colord(token.value).mix('#000000', mixPercentDark / 100).toHex();
						}
						tokenOutput += `\n  --${name}-dark: ${darkValue};`;
						const darkRgb = hexToRgb(darkValue);
						if (darkRgb) tokenOutput += `\n  --${name}-dark-rgb: ${darkRgb};`;

						// Gestion du LIGHT
						let lightValue;
						if (variations?.light) {
							lightValue = variations.light;
						} else {
							const mixPercentLight = mixPercent?.light ?? 80;
							// On simule le color-mix(var(--white) X%)
							lightValue = colord(token.value).mix('#ffffff', mixPercentLight / 100).toHex();
						}
						tokenOutput += `\n  --${name}-light: ${lightValue};`;
						const lightRgb = hexToRgb(lightValue);
						if (lightRgb) tokenOutput += `\n  --${name}-light-rgb: ${lightRgb};`;

						// Emphasis et Subtle (basés sur dark et light)
						tokenOutput += `\n  --${name}-text-emphasis: var(--${name}-dark);`;
						tokenOutput += `\n  --${name}-bg-subtle: var(--${name}-light);`;

						// Gestion du BORDER
						let borderValue;
						if (variations?.border) {
							borderValue = variations.border;
						} else {
							const mixPercentBorder = mixPercent?.border ?? 60;
							borderValue = colord(token.value).mix('#ffffff', mixPercentBorder / 100).toHex();
						}
						tokenOutput += `\n  --${name}-border-subtle: ${borderValue};`;
						const borderRgb = hexToRgb(borderValue);
						if (borderRgb) tokenOutput += `\n  --${name}-border-subtle-rgb: ${borderRgb};`;

						// Gestion du CONTRASTE
						const getContrastValue = (hex) => {
							const whiteContrast = Math.abs(Number(calcAPCA('#ffffff', hex)));
							const blackContrast = Math.abs(Number(calcAPCA('#000000', hex)));

							// On mixe avec la couleur de base pour un rendu plus premium (15% pour le noir, 5% pour le blanc)
							return whiteContrast > blackContrast
								? colord(hex).mix('#ffffff', 0.95).toHex()
								: colord(hex).mix('#000000', 0.85).toHex();
						};

						const contrastValue = getContrastValue(token.value);
						tokenOutput += `\n  --${name}-contrast: ${contrastValue};`;
						const contrastRgb = hexToRgb(contrastValue);
						if (contrastRgb) tokenOutput += `\n  --${name}-contrast-rgb: ${contrastRgb};`;

						// Contrastes des variantes
						tokenOutput += `\n  --${name}-dark-contrast: ${getContrastValue(darkValue)};`;
						tokenOutput += `\n  --${name}-light-contrast: ${getContrastValue(lightValue)};`;
						tokenOutput += `\n  --${name}-border-subtle-contrast: ${getContrastValue(borderValue)};`;
					}
				}

				// Ajout du contraste pour les couleurs simples (gray, etc) si c'est une couleur hex
				if (token.path.includes('color') && !token.path.includes('brands') && token.value.startsWith('#')) {
					const whiteContrast = Math.abs(Number(calcAPCA('#ffffff', token.value)));
					const blackContrast = Math.abs(Number(calcAPCA('#000000', token.value)));
					const contrastValue = whiteContrast > blackContrast ? '#ffffff' : '#000000';
					tokenOutput += `\n  --${name}-contrast: ${contrastValue};`;
				}
				return tokenOutput;
			}).join('\n');
		output += `\n}`;
		return output;
	},
	/**
	 * Format JS qui exporte l'objet complet des tokens
	 */
	'javascript/structured-object': ({ dictionary }) => {
		return `/**\n * Auto-generated\n */\n\nexport const tokens = ${JSON.stringify(dictionary.tokens, null, 2)};\n`;
	}
};
