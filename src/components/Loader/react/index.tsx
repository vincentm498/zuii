import React, { useEffect, useRef } from 'react';
import '../style/index.scss';
import { initLoader, LoaderOptions } from '../js/loader';

/**
 * Propriétés du composant Loader.
 */
interface Props extends LoaderOptions {
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Contenu optionnel (ex: texte sous le spinner).
	 */
	children?: React.ReactNode;
	/**
	 * Couleur du loader.
	 */
	color?: string;
}

/**
 * Composant Loader.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Loader = ({
	className = "",
	size = "md",
	variant = "dots",
	message,
	children,
	color = "primary",
}: Props) => {
	const loaderRef = useRef<HTMLDivElement>(null);
	const baseClass = "loader";

	// Applique les modificateurs de taille et de variante
	const sizeClass = size ? `${baseClass}--${size}` : "";
	const variantClass = variant ? `${baseClass}--${variant}` : "";
	const wrapperClass = `${baseClass} ${sizeClass} ${variantClass} ${color ? `loader--${color}` : ""} ${className}`.trim();

	useEffect(() => {
		if (loaderRef.current) {
			initLoader(loaderRef.current, { size, variant, message });
		}
	}, [size, variant, message]);

	/**
	 * Rendu du marqueur visuel selon la variante.
	 */
	const renderSpinner = () => {
		switch (variant) {
			case 'quad':
				return <div className={`${baseClass}__quad`}></div>;
			case 'spinner':
				return <div className={`${baseClass}__spinner-circle`}></div>;
			case 'pulse':
				return <div className={`${baseClass}__pulse`}></div>;
			case 'dots':
			default:
				return (
					<div className={`${baseClass}__spinner`}>
						<div className={`${baseClass}__dot`}></div>
						<div className={`${baseClass}__dot`}></div>
						<div className={`${baseClass}__dot`}></div>
					</div>
				);
		}
	};

	return (
		<div ref={loaderRef} className={wrapperClass}  aria-live="polite" aria-busy="true">
			{renderSpinner()}
			{(message || children) && (
				<div className={`${baseClass}__content`}>
					{message || children}
				</div>
			)}
		</div>
	);
};


