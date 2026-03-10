import React from 'react';
import { Splide, SplideSlide, SplideProps } from '@splidejs/react-splide';
import '../style/index.scss';
import { getSliderOptions } from '../js/slider';

export interface SliderItemProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Le contenu de la slide.
	 */
	children: React.ReactNode;
}

/**
 * Composant SliderItem (Slide).
 *
 * @param {SliderItemProps} props - Les propriétés de la slide.
 * @returns {JSX.Element} La slide rendue.
 */
export const SliderItem = ({ children, className = "", ...props }: SliderItemProps) => {
	const bemClass = "slider__item";

	return (
		<SplideSlide className={`${bemClass} ${className}`.trim()} {...props}>
			{children}
		</SplideSlide>
	);
};

export interface SliderProps extends Omit<SplideProps, 'children'> {
	/**
	 * Les slides ou contenu à afficher dans le slider.
	 */
	children: React.ReactNode;
	/**
	 * Options de configuration pour Splide.
	 */
	options?: SplideProps['options'];
	/**
	 * Classe CSS additionnelle pour les boutons de navigation (flèches).
	 */
	arrowClass?: string;
	/**
	 * Classe CSS additionnelle pour le conteneur de pagination.
	 */
	paginationClass?: string;
}

/**
 * Composant Slider basé sur Splide.js.
 *
 * @param {SliderProps} props - Les propriétés du Slider.
 * @returns {JSX.Element} Le slider rendu.
 */
export const Slider = ({
	children,
	options,
	className = "",
	arrowClass = "",
	paginationClass = "",
	...props
}: SliderProps) => {
	const bemClass = "slider";

	// Utilisation de la logique métier déportée
	const mergedOptions = getSliderOptions(bemClass, options, arrowClass, paginationClass);

	return (
		<Splide
			options={mergedOptions}
			className={`${bemClass} ${className}`.trim()}
			{...props}
		>
			{children}
		</Splide>
	);
};
