
/**
 * Propriétés du composant CookieConsent.
 */
interface Props {
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
}

/**
 * Composant CookieConsent.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const CookieConsent = ({
	className = "",
}: Props) => {
	const baseClass = "cookie-consent";
	const wrapperClass = `${baseClass} ${className}`.trim();

	return (
		<div className={wrapperClass}>
			CookieConsent
		</div>
	);
};
