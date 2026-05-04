import React from "react";
import '../style/index.scss';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
	/**
	 * Le contenu ou label à afficher dans le badge.
	 */
	children?: React.ReactNode;
	/**
	 * La couleur du badge.
	 */
	variant?: "primary" | "secondary" | "tertiary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
	/**
	 * Si le badge doit être en mode outline (bordure uniquement).
	 */
	outline?: boolean;
	/**
	 * La taille du badge.
	 */
	size?: "sm" | "md" | "lg" | "xl" | "xs";
}

/**
 * Composant Badge personnalisé.
 * Basé sur React Bootstrap Badge.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant Badge rendu.
 */
export const Badge = ({
	children,
	variant = "primary",
	className = "",
	size = "md",
	outline,
	...props
}: Props) => {
	const bemClass = "badge";
	const variantClass = variant ? `${bemClass}--${variant}` : "";
	const sizeClass = size ? `${bemClass}--${size}` : "";
	const outlineClass = outline ? `${bemClass}--outline ${bemClass}--outline-${variant}` : "";

	return (
		<span
			className={`${bemClass} ${variantClass} ${sizeClass} ${outlineClass} ${className}`.trim()}
			{...props}
		>
			{children}
		</span>
	);
};
