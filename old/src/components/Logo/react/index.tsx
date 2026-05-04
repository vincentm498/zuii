import '../style/index.scss';

/**
 * Propriétés du composant Logo.
 */
interface Props {
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * URL de l'image du logo.
	 */
	imgUrl?: string;
	/**
	 * Texte alternatif pour l'image.
	 */
	alt?: string;
	/**
	 * URL de la page à laquelle rediriger l'utilisateur.
	 */
	href?: string;
}

/**
 * Composant Logo.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Logo = ({
	className = "",
	imgUrl = "/img/svg/logo-placeholder.svg",
	alt = "Nom du logo",
	href = "/",
}: Props) => {
	const baseClass = "logo";
	const wrapperClass = `${baseClass} ${className}`.trim();

	return (
		<div className={wrapperClass}>
			<a href={href} className={`${baseClass}__link`}>
				<img src={imgUrl} className={`${baseClass}__img`} alt={`Logo de ${alt}`} />
			</a>
		</div>
	);
};
