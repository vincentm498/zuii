import React, { useRef, useEffect } from 'react';
import { initMenu } from '../js/menu';
import '../style/index.scss';

/**
 * Propriétés du composant Menu.
 */
interface Props {
	/** Enfants (sous-composants Menu.Left, Center, Right) */
	children?: React.ReactNode;
	/** Classe CSS additionnelle. */
	className?: string;
	/** Breakpoint en pixels à partir duquel le menu passe en mode mobile. Par défaut 768. */
	breakpoint?: number;
}

/**
 * Interface pour les sous-composants du Menu.
 */
interface SubProps {
	/** Contenu de la section */
	children: React.ReactNode;
	/** Classe CSS additionnelle */
	className?: string;
}

/**
 * Composant Menu responsive fonctionnant comme un layout.
 * Inclut un bouton burger automatique pour le mode mobile.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Menu = ({
	children,
	className = "",
	breakpoint = 768
}: Props) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const baseClass = "menu";
	const wrapperClass = `${baseClass} ${className}`.trim();

	useEffect(() => {
		if (!menuRef.current) return;
		const destroy = initMenu(menuRef.current);
		return destroy;
	}, []);

	return (
		<div
			ref={menuRef}
			className={wrapperClass}
			style={{ '--menu-breakpoint': `${breakpoint}px` } as React.CSSProperties}
		>
			<div className={`${baseClass}__container`}>
				{children}

				<button
					className={`${baseClass}__toggle`}
					aria-label="Ouvrir le menu"
					aria-expanded={false}
					type="button"
				>
					<span className={`${baseClass}__toggle-bar`}></span>
					<span className={`${baseClass}__toggle-bar`}></span>
					<span className={`${baseClass}__toggle-bar`}></span>
				</button>
			</div>

			<div className={`${baseClass}__mobile-nav`}>
				{children}
			</div>
		</div>
	);
};

/**
 * Section gauche du menu (ex: Logo).
 *
 * @param {SubProps} props - Les propriétés de la section.
 * @returns {JSX.Element} Le rendu de la section.
 */
Menu.Left = ({ children, className = "" }: SubProps) => (
	<div className={`menu__left ${className}`.trim()}>
		{children}
	</div>
);

/**
 * Section droite du menu (ex: Actions, Langue).
 *
 * @param {SubProps} props - Les propriétés de la section.
 * @returns {JSX.Element} Le rendu de la section.
 */
Menu.Right = ({ children, className = "" }: SubProps) => (
	<div className={`menu__right ${className}`.trim()}>
		{children}
	</div>
);
