import React from 'react';
import { Placeholder as BSTPlaceholder, PlaceholderProps as BSTPlaceholderProps } from 'react-bootstrap';
import '../style/index.scss';

/**
 * Propriétés du composant Placeholder.
 */
interface Props extends BSTPlaceholderProps {
	/** Animation du placeholder */
	animation?: 'glow' | 'wave' | undefined;
	/** Taille du placeholder */
	size?: 'xs' | 'sm' | 'lg';
	/** Couleur du placeholder */
	variant?: string;
	/** Largeur du placeholder (en colonnes ou %) */
	width?: number | string;
	/** Si le placeholder est un bouton */
	button?: boolean;
	/** Si le placeholder est une image */
	image?: boolean;
}

/**
 * Composant Placeholder.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Placeholder = ({
	animation = undefined,
	size,
	variant,
	width,
	button,
	image,
	children,
	className = "",
	...props
}: Props) => {
	const isFilled = React.Children.count(children) > 0;

	return (
		<BSTPlaceholder
			size={size}
			variant={variant}
			xs={width}
			aria-hidden="true"
			className={`placeholder__item ${animation ? `placeholder-${animation}` : ''} ${button ? 'btn' : ''} ${image ? 'placeholder--image' : ''} ${isFilled ? 'placeholder--filled' : ''} ${variant && button ? `btn-${variant}` : ''} ${className}`.trim()}
			{...(button ? { as: 'button' } : {})}
			{...props}
		>
			{children}
		</BSTPlaceholder>
	);
};
