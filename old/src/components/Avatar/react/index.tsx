import '../style/index.scss';
import { Icon } from "../../Icon/react";

/**
 * Propriétés du composant Avatar.
 */
interface Props {
	/**
	 * URL de l'image de l'avatar.
	 */
	src?: string;
	/**
	 * Texte alternatif pour l'image.
	 */
	alt?: string;
	/**
	 * Initiales à afficher si aucune image n'est fournie.
	 */
	initials?: string;
	/**
	 * Taille de l'avatar.
	 * @default "md"
	 */
	size?: "sm" | "md" | "lg";
	/**
	 * Forme de l'avatar.
	 * @default "round"
	 */
	shape?: "round" | "square";
	/**
	 * Statut de connexion de l'utilisateur.
	 */
	status?: "online" | "offline" | "away" | "busy";
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
}

/**
 * Composant Avatar pour afficher une image de profil, des initiales ou une icône par défaut.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Avatar = ({
	src,
	alt,
	initials,
	size = "md",
	shape = "round",
	status,
	className = "",
}: Props) => {
	const baseClass = "avatar";
	const sizeClass = `${baseClass}--${size}`;
	const shapeClass = `${baseClass}--${shape}`;
	const wrapperClass = `${baseClass} ${sizeClass} ${shapeClass} ${className}`.trim();

	const renderContent = () => {
		if (src) {
			return <img src={src} alt={alt || ""} className={`${baseClass}__image`} />;
		}
		if (initials) {
			return <span className={`${baseClass}__initials`}>{initials.substring(0, 2)}</span>;
		}
		return <Icon name="icon-user" className={`${baseClass}__icon`} />;
	};

	return (
		<div className={wrapperClass}>
			<div className={`${baseClass}__content`}>
				{renderContent()}
			</div>
			{status && (
				<span className={`${baseClass}__status ${baseClass}__status--${status}`} />
			)}
		</div>
	);
};
