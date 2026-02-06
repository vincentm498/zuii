import '../style/index.scss';

/**
 * Propriétés du composant Radius.
 */
interface Props {
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	* Variants.
	*/
	variant?: 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'pill';
	/**
	* Value.
	*/
	value?: string;
}

/**
 * Composant Radius.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Radius = ({
	className = "",
	variant = "md",
	value = ""
}: Props) => {
	const baseClass = "radius";
	const wrapperClass = `${baseClass} ${className} ${baseClass}--${variant}`.trim();

	return (
		<div className={wrapperClass}>
			Radius--{variant}
			{value ? <p>{value}</p> : null}
		</div>
	);
};
