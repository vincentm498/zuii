import "../style/index.scss";

interface Props {
	/**
	 * Les éléments à grouper.
	 */
	children: React.ReactNode;
	/**
	 * Si le groupe doit être affiché verticalement.
	 */
	vertical?: boolean;
	/**
	 * Si le groupe doit être centré.
	 */
	center?: boolean;
	/**
	 * Label aria pour l'accessibilité.
	 */
	ariaLabel?: string;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Titre du groupe.
	 */
	title?: string;
	/**
	 * Espacement entre les éléments (gap).
	 */
	gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
	/**
	 * Alignement des éléments.
	 */
	align?: "start" | "end" | "center" | "between";
}

/**
 * Composant de groupement simple.
 * Agit comme un wrapper display: flex.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant Group rendu.
 */
export const Group = ({
	children,
	vertical = false,
	title = "",
	className = "",
	gap = "md",
	center = false,
	ariaLabel = title ? `Groupe d'éléments ${title}` : "Groupe d'éléments",
	align = "start",
}: Props) => {

	const verticalClass = vertical ? "group--vertical" : "";
	const gapClass = `group--gap-${gap}`;
	const centerClass = center ? "group--center" : "";
	const alignClass = align ? `group--${align}` : "";

	return (
		<div
			aria-label={ariaLabel}
			className={`group ${verticalClass} ${gapClass} ${centerClass} ${alignClass} ${className}`.trim()}
		>
			{children}
		</div>
	);
};
