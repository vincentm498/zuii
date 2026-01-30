import "../style/index.scss";

/**
 * Propriétés du composant Icon.
 */
interface Props {
	/**
	 * Le nom de l'icône (ex: "house", "check", "trash").
	 * Correspond à la classe CSS icon-[name].
	 */
	name: string;
	/**
	 * La taille de l'icône.
	 */
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
}

/**
 * Composant Icon pour afficher des icônes de police.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Icon = ({
	name,
	size = "lg",
	className = "",
}: Props) => {
	const bemClass = "icon";
	const sizeClass = `${bemClass}--size-${size}`;

	return (
		<span className={`${bemClass} ${sizeClass} ${className}`.trim()}>
			<i className={`${name}`}></i>
		</span>
	);
};
