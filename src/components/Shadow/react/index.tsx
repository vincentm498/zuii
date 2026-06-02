import '../style/index.scss';

/**
 * Propriétés du composant Shadow.
 */
interface Props {
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	* Variants.
	*/
	variant?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'outline' | 'inset' | 'none';

}

/**
 * Composant Shadow.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Shadow = ({
	className = "",
	variant = "md",
}: Props) => {
	const baseClass = "shadow";
	const wrapperClass = `${baseClass} ${className} ${baseClass}--${variant}`.trim();

	return (
		<div className={wrapperClass}>
			Shadow--{variant}
		</div>
	);
};
