// @ts-ignore
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
	paginationClass: string = "",
	totalSlides?: number
): SplideProps['options'] => {
	const customClasses = {
		...options?.classes,
		arrow: `splide__arrow ${bemClass}__arrow ${arrowClass}`.trim(),
		pagination: `splide__pagination ${bemClass}__pagination ${paginationClass}`.trim(),
	};

	let finalOptions: SplideProps['options'] = {
		...options,
		classes: customClasses
	};

	if (totalSlides !== undefined) {
		const updateOptionsForTotalSlides = (opts: Record<string, any>) => {
			if (opts && typeof opts.perPage === 'number') {
				const requestedPerPage = opts.perPage;
				opts.perPage = getSlidesPerPage(requestedPerPage, totalSlides);

				if (opts.type === 'loop' && totalSlides < requestedPerPage * 2) {
					opts.clones = totalSlides;
				}

				if (totalSlides <= requestedPerPage) {
					opts.arrows = false;
					opts.pagination = false;
					opts.drag = false;
				} else {
					if (opts.arrows === undefined) opts.arrows = true;
					if (opts.pagination === undefined) opts.pagination = true;
					if (opts.drag === undefined) opts.drag = true;
				}
			}
		};

		updateOptionsForTotalSlides(finalOptions);

		if (finalOptions.breakpoints) {
			// On clone les breakpoints pour éviter de muter l'objet original
			const newBreakpoints: Record<string, any> = { ...finalOptions.breakpoints };
			Object.keys(newBreakpoints).forEach((key) => {
				const bp = newBreakpoints[key];
				if (bp && typeof bp === 'object') {
					updateOptionsForTotalSlides(bp);
				}
			});
			finalOptions.breakpoints = newBreakpoints;
		}
	}

	return finalOptions;
};

/**
 * Retourne le nombre de slides à afficher en s'assurant
 * qu'il ne dépasse pas le nombre de slides disponibles.
 *
 * @param {number} perPage - Le nombre de slides souhaité à afficher.
 * @param {number} totalSlides - Le nombre total de slides disponibles.
 * @returns {number} Le nombre de slides à afficher, plafonné au total disponible.
 */
export const getSlidesPerPage = (perPage: number, totalSlides: number): number => {
	return Math.min(perPage, totalSlides);
};
