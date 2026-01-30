import { hexToRgb } from '../utils/color.js';

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
				if (token.path.includes('color') && !name.includes('emphasis') && !name.includes('subtle') && !name.includes('gray')) {
					const rgb = hexToRgb(token.value);
					if (rgb) tokenOutput += `\n  --${name}-rgb: ${rgb};`;
				}
				if (token.path.includes('brands') && token.value.startsWith('#')) {
					const rgb = hexToRgb(token.value);
					if (rgb) {
						tokenOutput += `\n  --${name}-rgb: ${rgb};`;
						const variations = token.original?.variations;
						const mixPercent = token.original?.mixPercent;
						if (variations?.dark) {
							tokenOutput += `\n  --${name}-dark: ${variations.dark};`;
							const darkRgb = hexToRgb(variations.dark);
							if (darkRgb) tokenOutput += `\n  --${name}-dark-rgb: ${darkRgb};`;
						} else {
							const mixPercentDark = mixPercent?.dark ?? 70;
							tokenOutput += `\n  --${name}-dark: color-mix(in srgb, var(--${name}), var(--black) ${mixPercentDark}%);`;
						}
						if (variations?.light) {
							tokenOutput += `\n  --${name}-light: ${variations.light};`;
							const lightRgb = hexToRgb(variations.light);
							if (lightRgb) tokenOutput += `\n  --${name}-light-rgb: ${lightRgb};`;
						} else {
							const mixPercentLight = mixPercent?.light ?? 80;
							tokenOutput += `\n  --${name}-light: color-mix(in srgb, var(--${name}), var(--white) ${mixPercentLight}%);`;
						}
						tokenOutput += `\n  --${name}-text-emphasis: var(--${name}-dark);`;
						tokenOutput += `\n  --${name}-bg-subtle: var(--${name}-light);`;
						if (variations?.border) {
							tokenOutput += `\n  --${name}-border-subtle: ${variations.border};`;
						} else {
							const mixPercentBorder = mixPercent?.border ?? 60;
							tokenOutput += `\n  --${name}-border-subtle: color-mix(in srgb, var(--${name}), var(--white) ${mixPercentBorder}%);`;
						}
					}
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
