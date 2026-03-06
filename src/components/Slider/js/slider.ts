import { SplideProps } from '@splidejs/react-splide';

/**
 * Prépare et fusionne les options personnalisées de Splide avec les classes CSS métiers.
 *
 * @param {string} bemClass - La classe de base BEM du slider.
 * @param {SplideProps['options']} options - Les options initiales fournies au slider.
 * @param {string} arrowClass - Les classes personnalisées pour les flèches.
 * @param {string} paginationClass - Les classes personnalisées pour la pagination.
 * @returns {SplideProps['options']} Les options complètes incluant les classes.
 */
export const getSliderOptions = (
	bemClass: string,
	options?: SplideProps['options'],
	arrowClass: string = "",
	paginationClass: string = ""
): SplideProps['options'] => {
	const customClasses = {
		...options?.classes,
		arrow: `splide__arrow ${bemClass}__arrow ${arrowClass}`.trim(),
		pagination: `splide__pagination ${bemClass}__pagination ${paginationClass}`.trim(),
	};

	return {
		...options,
		classes: customClasses
	};
};
