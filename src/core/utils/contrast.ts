import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import { calcAPCA } from 'apca-w3';

extend([mixPlugin]);

/**
 * Détermine la couleur de contraste idéale (noir ou blanc) pour une couleur donnée en utilisant l'algorithme APCA.
 * APCA (Accessible Perceptual Contrast Algorithm) est plus précis que le WCAG 2.1 car il prend en compte
 * la perception humaine de la luminosité.
 *
 * @param {string} color - La couleur au format hexadécimal, RGB ou HSL.
 * @returns {string} La couleur de contraste recommandée (teintée de blanc ou noir).
 */
export const getContrastColor = (color: string): string => {
	const whiteContrast = Math.abs(Number(calcAPCA('#ffffff', color)));
	const blackContrast = Math.abs(Number(calcAPCA('#000000', color)));

	return whiteContrast > blackContrast
		? colord(color).mix('#ffffff', 0.95).toHex()
		: colord(color).mix('#000000', 0.85).toHex();
};

/**
 * Génère une couleur teintée en mélangeant une couleur de base avec une couleur de mix.
 * Utilise color-mix en interne si supporté par le contexte, sinon simule le mélange.
 *
 * @param {string} baseColor - La couleur de base.
 * @param {string} mixColor - La couleur à mélanger.
 * @param {number} amount - Le pourcentage de la couleur de mix (0 à 100).
 * @returns {string} La couleur résultante au format hexadécimal.
 */
export const getTintedColor = (baseColor: string, mixColor: string, amount: number): string => {
	return colord(baseColor).mix(mixColor, amount / 100).toHex();
};
