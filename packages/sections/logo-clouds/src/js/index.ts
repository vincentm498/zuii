import { Splide } from '@splidejs/splide';
import { getSliderOptions } from '../../../../../src/components/Slider/js/slider';

/**
 * Initialise les sliders pour la section Logo Clouds.
 */
export const initLogoClouds = () => {
	const sliders = document.querySelectorAll('.logo-clouds--slider .splide');
	sliders.forEach((slider) => {
		new Splide(slider as HTMLElement, getSliderOptions('logo-clouds', {
			type: 'loop',
			perPage: 4,
			autoplay: true,
			interval: 3000,
			arrows: false,
			pagination: false,
			breakpoints: {
				768: { perPage: 4 },
				480: { perPage: 2 }
			}
		} as any)).mount();
	});
};
