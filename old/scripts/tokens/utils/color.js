/**
 * Convertit une couleur hexadécimale en valeurs RGB séparées par des virgules
 *
 * @param {string} hex - Couleur au format hexadécimal (#RGB ou #RRGGBB)
 * @returns {string|null} Valeurs RGB au format "r, g, b" (ex: "255, 0, 0") ou null si invalide
 */
export const hexToRgb = (hex) => {
	if (typeof hex !== 'string' || !hex.startsWith('#')) return null;
	let r, g, b;
	if (hex.length === 4) {
		r = parseInt(hex[1] + hex[1], 16);
		g = parseInt(hex[2] + hex[2], 16);
		b = parseInt(hex[3] + hex[3], 16);
	} else {
		r = parseInt(hex.slice(1, 3), 16);
		g = parseInt(hex.slice(3, 5), 16);
		b = parseInt(hex.slice(5, 7), 16);
	}
	return `${r}, ${g}, ${b}`;
};
