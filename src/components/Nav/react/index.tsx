import React, { useEffect } from 'react';
import '../style/index.scss';
import { Icon, Button, Tooltip } from '../../../index';
import { initNav } from '../js/nav';

/**
 * Propriétés d'un élément de navigation.
 */
interface NavItemProps {
	/**
	 * Contenu personnalisé de l'élément (prioritaire sur label/icon).
	 */
	children?: React.ReactNode;
	/**
	 * Composant personnalisé à afficher (ex: <Avatar />).
	 */
	component?: React.ReactNode;
	/**
	 * Libellé de l'élément.
	 */
	label?: string;
	/**
	 * Nom de l'icône à afficher.
	 */
	icon?: string;
	/**
	 * URL du lien.
	 */
	href?: string;
	/**
	 * Action au clic. Si présent, l'élément sera rendu comme un bouton.
	 */
	onClick?: () => void;
	/**
	 * Tooltip au survol. Si true, utilise le label.
	 */
	tooltip?: string | boolean;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Autres propriétés (ex: aria-label).
	 */
	[key: string]: any;
	/**
	 * Items en colonne.
	 */
	vertical?: boolean

}

/**
 * Propriétés du composant Nav.
 */
interface NavProps {
	/**
	 * Contenu de la navigation (utilisé si items n'est pas fourni).
	 */
	children?: React.ReactNode;
	/**
	 * Liste des éléments de navigation pour un rendu en boucle.
	 */
	items?: NavItemProps[];
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Direction de la navigation.
	 */
	vertical?: boolean;
	/**
	 * Active les tooltips pour tous les items. Si true, utilise le label par défaut.
	 */
	tooltip?: boolean;
}

/**
 * Composant pour un élément individuel de navigation.
 *
 * @param {NavItemProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
const NavItem = ({
	children,
	component,
	label,
	icon,
	href,
	onClick,
	tooltip = false,
	className = "",
	vertical = false,
	...props
}: NavItemProps) => {
	const content = children || (
		<>
			{component || (icon && <Icon name={icon} />)}
			{label && <span>{label}</span>}
		</>
	);

	const inner = onClick ? (
		<Button icon={component ? undefined : icon} btnIcon onClick={onClick} {...props}>
			{component}
			{(!component && !icon) && label}
		</Button>
	) : (
		href ? <a href={href} {...props}>{content}</a> : content
	);

	const tooltipContent = typeof tooltip === 'string' ? tooltip : (tooltip === true ? label : undefined);

	return (
		<li className={`nav__item ${vertical ? 'nav__item--col' : ''}  ${className} `.trim()}>
			{tooltipContent ? (
				<Tooltip content={tooltipContent} placement={vertical ? 'right' : 'bottom'}>
					<span>{inner}</span>
				</Tooltip>
			) : inner}
		</li>
	);
};

/**
 * Composant Nav principal.
 *
 * @param {NavProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Nav = ({
	children,
	items,
	className = "",
	vertical = false,
	tooltip = false
}: NavProps) => {
	const baseClass = "nav";
	const wrapperClass = `${baseClass} ${className}`.trim();

	// Initialisation de la logique Nav (détection de l'état actif, etc.)
	useEffect(() => {
		initNav();
	}, []);

	return (
		<nav className={wrapperClass}>
			<ul className={`nav__items ${vertical ? `${baseClass}__items--col` : ""} ${className ? `${className}__items` : ""}`.trim()}>
				{items ? items.map((item, index) => (
					<NavItem
						key={index}
						{...item}
						tooltip={tooltip ? (item.tooltip ?? true) : false}
					/>
				)) : children}
			</ul>
		</nav>
	);
};

Nav.Item = NavItem;
