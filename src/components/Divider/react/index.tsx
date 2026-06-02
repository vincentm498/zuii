import React from 'react';
import '../style/index.scss';

/**
 * Props pour le composant Divider.
 */
interface Props {
	/** Contenu optionnel à afficher au milieu du divider */
	children?: React.ReactNode;
	/** Classe CSS additionnelle */
	className?: string;
	/** Taille du divider */
	spacing?: "sm" | "md" | "lg";
	/** Hauteur du divider */
	height?: "sm" | "md" | "lg" | "xl" | "xxl";
	/** Divider transparent */
	transparent?: boolean;
}

/**
 * Composant Divider pour séparer des sections de contenu.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant Divider.
 */
export const Divider = ({ children, className = '', spacing = 'md', height = 'sm', transparent = false }: Props) => {
	if (!children) {
		return <hr className={`divider ${className} divider--spacing-${spacing} divider--height-${height} ${transparent ? 'divider--transparent' : ''}`} />;
	}

	return (
		<div className={`divider__wrapper ${className} divider--spacing-${spacing} divider--height-${height}`}>
			<span className="divider__content">
				{children}
			</span>
		</div>
	);
};
