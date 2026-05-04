declare module 'apca-w3' {
	export function calcAPCA(textColor: string | number[], backgroundColor: string | number[], places?: number, round?: boolean): string | number;
	export function APCAcontrast(txtY: number, bgY: number, places?: number): number;
	export function sRGBtoY(rgb: number[]): number;
	export function alphaBlend(rgbaFG: number[], rgbBG: number[], round?: boolean): number[];
}
