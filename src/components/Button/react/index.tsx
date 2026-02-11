import { Button as BootstrapButton, ButtonProps } from "react-bootstrap";
import '../style/index.scss';
import { Icon } from "../../Icon/react";

interface Props extends Omit<ButtonProps, "size"> {
	/**
	 * Le titre à afficher sur le bouton.
	 */
	children?: React.ReactNode;
	/**
	 * La taille du bouton. Supporte les tailles Bootstrap (sm, lg) et personnalisées (xl, xs).
	 */
	size?: "sm" | "md" | "lg" | "xl" | "xs" | undefined;
	/**
	 * L'icône à afficher sur le bouton.
	 */
	icon?: string;
	/**
	 * La direction du bouton.
	 */
	reverse?: boolean;
	/**
	 * Style de bouton seulement avec icône
	 */
	btnIcon?: boolean;
	/**
	 * Style de bouton transparent
	 */
	transparent?: boolean;
	/**
	 * Clé d'événement pour l'intégration avec des composants comme Tabs.
	 */
	eventKey?: string | number;
}

/**
 * Composant Bouton personnalisé.
 * Supporte toutes les propriétés de react-bootstrap.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant bouton rendu.
 */
export const Button = ({
	children = "",
	variant = "primary",
	reverse = false,
	size,
	icon,
	btnIcon = false,
	transparent = false,
	className = "",

	...props
}: Props) => {

	const customSizeClass = size ? `btn-${size}` : "";

	return (
		<BootstrapButton
			variant={variant}
			className={`${className} ${customSizeClass} ${btnIcon ? "btn-icon" : ""} ${transparent ? "btn-transparent" : ""}`.trim()}
			{...props}
		>
			<div className={`btn-content ${reverse ? "btn-reverse" : ""}`}>
				{icon && <Icon name={icon} />}
				{children && children}
			</div>
		</BootstrapButton>
	);
};
