import React, { useState, useEffect, useRef, useCallback } from "react";
import { type ContextMenuItem, executeAction, getDisplayShortcut, contextMenuData, isItemDisabled, calculatePosition, lockScroll, unlockScroll, adjustSubMenuPosition } from "../js/context-menu";
import '../style/index.scss';

interface MenuItemProps {
	item: ContextMenuItem;
	onAction?: (action: string) => void;
	closeMenu: () => void;
}

/**
 * Composant interne pour un item de menu, gérant ses propres sous-menus.
 *
 * @param {MenuItemProps} props - Les propriétés de l'item.
 * @returns {JSX.Element} L'élément de menu.
 */
const MenuItem = ({ item, onAction, closeMenu }: MenuItemProps) => {
	const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
	const subMenuRef = useRef<HTMLDivElement>(null);

	const bemClass = "context-menu";
	const hasSubMenu = !!(item.items && item.items.length > 0);
	const displayShortcut = getDisplayShortcut(item.shortcuts);
	const isDisabled = isItemDisabled(item);

	useEffect(() => {
		if (isSubMenuVisible && subMenuRef.current) {
			adjustSubMenuPosition(subMenuRef.current);
		}
	}, [isSubMenuVisible]);

	if (item.type === "separator") {
		return <div className={`${bemClass}__separator`} />;
	}

	return (
		<div
			className={`${bemClass}__item ${hasSubMenu ? `${bemClass}__sub-trigger` : ""} ${isDisabled ? "disabled" : ""}`.trim()}
			onMouseEnter={() => hasSubMenu && !isDisabled && setIsSubMenuVisible(true)}
			onMouseLeave={() => hasSubMenu && !isDisabled && setIsSubMenuVisible(false)}
			onClick={(e) => {
				if (!hasSubMenu && !isDisabled) {
					e.stopPropagation();
					executeAction(item, onAction);
					closeMenu();
				}
			}}
		>
			{item.label}
			{displayShortcut && <span className={`${bemClass}__shortcut`}>{displayShortcut}</span>}
			{hasSubMenu && isSubMenuVisible && (
				<div
					ref={subMenuRef}
					className={`${bemClass} ${bemClass}__sub-menu`}
				>
					{item.items!.map((subItem, index) => (
						<MenuItem
							key={index}
							item={subItem}
							onAction={onAction}
							closeMenu={closeMenu}
						/>
					))}
				</div>
			)}
		</div>
	);
};

interface Props {
	/**
	 * Les éléments du menu contextuel.
	 */
	items?: ContextMenuItem[];
	/**
	 * Fonction appelée lors du clic sur un item.
	 */
	onAction?: (action: string) => void;
	/**
	 * Le composant ou l'élément sur lequel le menu s'applique.
	 */
	children: React.ReactNode;
	/**
	 * Classe CSS additionnelle pour le conteneur.
	 */
	className?: string;
}

/**
 * Composant de menu contextuel (clic droit) natif.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant ContextMenu.
 */
export const ContextMenu = ({
	items = contextMenuData.items as ContextMenuItem[],
	onAction,
	children,
	className = "",
}: Props) => {
	const [isVisible, setIsVisible] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const menuRef = useRef<HTMLDivElement>(null);

	const bemClass = "context-menu";

	/**
	 * Gère l'ouverture du menu contextuel.
	 *
	 * @param {React.MouseEvent} event - L'événement de souris.
	 */
	const handleContextMenu = useCallback((event: React.MouseEvent) => {
		event.preventDefault();
		setPosition({ x: event.clientX, y: event.clientY });
		setIsVisible(true);
	}, []);

	/**
	 * Ferme le menu.
	 */
	const closeMenu = useCallback(() => {
		setIsVisible(false);
	}, []);

	// Ajuster la position après le rendu initial du menu pour avoir les vraies dimensions
	useEffect(() => {
		if (isVisible && menuRef.current) {
			const { offsetWidth, offsetHeight } = menuRef.current;
			const { x, y } = calculatePosition(position.x, position.y, offsetWidth, offsetHeight);

			// On ne met à jour que si la position calculée diffère de la position initiale du clic
			// ou si on veut forcer le repositionnement (ce qui est le cas ici pour le flip).
			menuRef.current.style.top = `${y}px`;
			menuRef.current.style.left = `${x}px`;
			menuRef.current.style.visibility = "visible";
		}
	}, [isVisible, position.x, position.y]);

	// Gérer les événements extérieurs et le défilement
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				closeMenu();
			}
		};

		if (isVisible) {
			document.addEventListener("mousedown", handleClickOutside);
			lockScroll();
		} else {
			unlockScroll();
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			unlockScroll();
		};
	}, [isVisible, closeMenu]);

	return (
		<div
			onContextMenu={handleContextMenu}
			className={`context-menu-wrapper ${className}`}
		>
			{children}

			{isVisible && (
				<div
					ref={menuRef}
					className={bemClass}
					style={{
						top: position.y,
						left: position.x,
						visibility: "hidden" // Caché le temps de la mesure au premier affichage
					}}
				>
					{items.map((item, index) => (
						<MenuItem
							key={index}
							item={item}
							onAction={onAction}
							closeMenu={closeMenu}
						/>
					))}
				</div>
			)}
		</div>
	);
};
