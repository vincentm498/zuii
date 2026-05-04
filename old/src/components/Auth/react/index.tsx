import React from 'react';
import '../style/index.scss';

/**
 * Propriétés du composant Auth.
 */
interface Props {
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Contenu du composant.
	 */
	children?: React.ReactNode;
}

/**
 * Composant Auth.Header.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
const AuthHeader = ({ children, className = "" }: Props) => (
	<div className={`auth__header ${className}`.trim()}>
		{children}
	</div>
);

/**
 * Composant Auth.Body.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
const AuthBody = ({ children, className = "" }: Props) => (
	<div className={`auth__body ${className}`.trim()}>
		{children}
	</div>
);

/**
 * Composant Auth.Footer.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
const AuthFooter = ({ children, className = "" }: Props) => (
	<div className={`auth__footer ${className}`.trim()}>
		{children}
	</div>
);

/**
 * Composant Auth.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Auth = ({
	children,
	className = "",
}: Props) => {
	const baseClass = "auth";
	const wrapperClass = `${baseClass} ${className}`.trim();

	return (
		<main className={wrapperClass}>
			<div className="auth__container">
				{children}
			</div>
		</main>
	);
};

Auth.Header = AuthHeader;
Auth.Body = AuthBody;
Auth.Footer = AuthFooter;
