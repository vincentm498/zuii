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
	ariaLabel = title ? `Groupe d'éléments ${title}` : "Groupe d'éléments",
}: Props) => {

	const verticalClass = vertical ? "group--vertical" : "";
	const gapClass = gap !== "none" ? `group--gap-${gap}` : "";

	return (
		<div
			aria-label={ariaLabel}
			className={`group ${verticalClass} ${gapClass} ${className}`.trim()}
		>
			{children}
		</div>
	);
};
