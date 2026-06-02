/**
 * Représente un item du menu contextuel.
 */
export interface ContextMenuItem {
	/** Libellé de l'item */
	label: string;
	/** Type de l'item */
	type?: "item" | "separator";
	/** Action à exécuter (identifiant) */
	action?: string;
	/** Fonction de rappel personnalisée */
	onAction?: () => void;
	/** Raccourcis clavier à afficher */
	shortcuts?: string[];
	/** Sous-items pour un menu imbriqué */
	items?: ContextMenuItem[];
	/** Si l'item est désactivé */
	disabled?: boolean;
}

/**
 * Vérifie si un item est effectivment désactivé.
 *
 * @param {ContextMenuItem} item - L'item à vérifier.
 * @returns {boolean} True si l'item est désactivé.
 */
export const isItemDisabled = (item: ContextMenuItem): boolean => {
	const hasSubMenu = item.items && item.items.length > 0;
	return !!(item.disabled || (!hasSubMenu && !item.onAction && !item.action && item.type !== "separator"));
};

/**
 * Calcule la position optimale pour que le menu reste dans le viewport.
 *
 * @param {number} x - Position X souhaitée.
 * @param {number} y - Position Y souhaitée.
 * @param {number} menuWidth - Largeur du menu.
 * @param {number} menuHeight - Hauteur du menu.
 * @param {number} [offsetX=2] - Décalage horizontal par rapport au clic.
 * @param {number} [offsetY=2] - Décalage vertical par rapport au clic.
 * @returns {{x: number, y: number}} La position corrigée.
 */
export const calculatePosition = (x: number, y: number, menuWidth: number, menuHeight: number, offsetX = 2, offsetY = 2): { x: number, y: number } => {
	let finalX = x + offsetX;
	let finalY = y + offsetY;

	// Ajustement horizontal si déborde à droite
	if (finalX + menuWidth > window.innerWidth) {
		finalX = x - menuWidth - offsetX;
	}

	// Ajustement vertical si déborde en bas
	if (finalY + menuHeight > window.innerHeight) {
		finalY = y - menuHeight - offsetY;
	}

	// Sécurité pour ne pas sortir à gauche ou en haut
	return {
		x: Math.max(0, Math.min(finalX, window.innerWidth - menuWidth)),
		y: Math.max(0, Math.min(finalY, window.innerHeight - menuHeight))
	};
};

/**
 * Bloque le défilement de la page.
 */
export const lockScroll = (): void => {
	document.body.style.overflow = "hidden";
};

/**
 * Débloque le défilement de la page.
 */
export const unlockScroll = (): void => {
	document.body.style.overflow = "";
};

/**
 * Ajuste la position d'un sous-menu pour qu'il reste dans le viewport.
 *
 * @param {HTMLElement} subMenu - L'élément sous-menu à ajuster.
 */
export const adjustSubMenuPosition = (subMenu: HTMLElement): void => {
	const rect = subMenu.getBoundingClientRect();

	// Ajustement de position si débordement horizontal
	if (rect.right > window.innerWidth) {
		subMenu.style.left = "auto";
		subMenu.style.right = "100%";
		subMenu.style.marginLeft = "0";
		subMenu.style.marginRight = "2px";
	}

	// Ajustement de position si débordement vertical
	if (rect.bottom > window.innerHeight) {
		subMenu.style.top = "auto";
		subMenu.style.bottom = "0";
	}
};

/**
 * Exécute l'action associée à un item.
 *
 * @param {ContextMenuItem} item - L'item sur lequel on a cliqué.
 * @param {(action: string) => void} [onAction] - Callback global optionnel.
 */
export const executeAction = (item: ContextMenuItem, onAction?: (action: string) => void): void => {
	if (isItemDisabled(item) || item.type === "separator") return;

	if (item.onAction) {
		item.onAction();
	}

	if (item.action && onAction) {
		onAction(item.action);
	}
};

/**
 * Formate les raccourcis pour l'affichage.
 *
 * @param {string[]} [shortcuts] - Liste des raccourcis.
 * @returns {string} Le raccourci formaté.
 */
export const getDisplayShortcut = (shortcuts?: string[]): string => {
	if (!shortcuts || shortcuts.length === 0) return "";
	return shortcuts.join(" + ");
};

/**
 * Données factices pour la démonstration.
 */
export const contextMenuData = {
	items: [
		{
			label: "Nouveau",
			action: "new",
			shortcuts: ["Cmd", "N"]
		},
		{
			label: "Ouvrir",
			action: "open",
			shortcuts: ["Cmd", "O"]
		},
		{ type: "separator", label: "" },
		{
			label: "Édition",
			items: [
				{
					label: "Couper",
					action: "cut",
					shortcuts: ["Cmd", "X"]
				},
				{
					label: "Copier",
					action: "copy",
					shortcuts: ["Cmd", "C"]
				},
				{
					label: "Coller",
					action: "paste",
					shortcuts: ["Cmd", "V"],
					disabled: true
				}
			]
		},
		{ type: "separator", label: "" },
		{
			label: "Partager",
			items: [
				{
					label: "Par email",
					action: "share-email"
				},
				{
					label: "Réseaux sociaux",
					items: [
						{ label: "Twitter", action: "share-twitter" },
						{ label: "Facebook", action: "share-facebook" }
					]
				}
			]
		},
		{ type: "separator", label: "" },
		{
			label: "Supprimer",
			action: "delete",
			shortcuts: ["⌫"],
			disabled: false
		}
	] as ContextMenuItem[]
};

/**
 * Gère un menu contextuel en Vanilla JS.
 */
export class ContextMenuManager {
	private menuElement: HTMLElement | null = null;
	private items: ContextMenuItem[];
	private onAction?: (action: string) => void;
	private activeSubMenus: HTMLElement[] = [];

	/**
	 * @param {ContextMenuItem[]} items - Les items du menu.
	 * @param {(action: string) => void} [onAction] - Callback d'action.
	 */
	constructor(items: ContextMenuItem[] = contextMenuData.items, onAction?: (action: string) => void) {
		this.items = items;
		this.onAction = onAction;
		this.handleOutsideClick = this.handleOutsideClick.bind(this);
	}

	/**
	 * Attache le menu contextuel à un élément.
	 *
	 * @param {HTMLElement} element - L'élément cible.
	 */
	public attach(element: HTMLElement): void {
		element.addEventListener("contextmenu", (e: MouseEvent) => {
			e.preventDefault();
			this.show(e.clientX, e.clientY);
		});
	}

	/**
	 * Affiche le menu à une position donnée.
	 *
	 * @param {number} x - Position X.
	 * @param {number} y - Position Y.
	 */
	public show(x: number, y: number): void {
		this.destroy();
		this.menuElement = this.createMenuElement(this.items);
		document.body.appendChild(this.menuElement);

		const { x: finalX, y: finalY } = calculatePosition(x, y, this.menuElement.offsetWidth, this.menuElement.offsetHeight);

		this.menuElement.style.top = `${finalY}px`;
		this.menuElement.style.left = `${finalX}px`;
		lockScroll();

		document.addEventListener("mousedown", this.handleOutsideClick);
	}

	/**
	 * Détruit le menu actuel.
	 */
	public destroy(): void {
		if (this.menuElement) {
			this.menuElement.remove();
			this.menuElement = null;
			unlockScroll();
		}
		document.removeEventListener("mousedown", this.handleOutsideClick);
	}

	/**
	 * Crée l'élément DOM du menu.
	 *
	 * @param {ContextMenuItem[]} items - Les items à afficher.
	 * @returns {HTMLElement} L'élément menu.
	 * @private
	 */
	private createMenuElement(items: ContextMenuItem[]): HTMLElement {
		const menu = document.createElement("div");
		menu.className = "context-menu";

		items.forEach(item => {
			if (item.type === "separator") {
				const separator = document.createElement("div");
				separator.className = "context-menu__separator";
				menu.appendChild(separator);
				return;
			}

			const itemEl = document.createElement("div");
			const isDisabled = isItemDisabled(item);
			const hasSubMenu = !!(item.items && item.items.length > 0);

			itemEl.className = `context-menu__item ${hasSubMenu ? "context-menu__sub-trigger" : ""} ${isDisabled ? "disabled" : ""}`.trim();
			itemEl.textContent = item.label;

			const shortcut = getDisplayShortcut(item.shortcuts);
			if (shortcut) {
				const span = document.createElement("span");
				span.className = "context-menu__shortcut";
				span.textContent = shortcut;
				itemEl.appendChild(span);
			}

			if (!isDisabled) {
				if (hasSubMenu) {
					itemEl.addEventListener("mouseenter", () => this.showSubMenu(itemEl, item.items!));
					itemEl.addEventListener("mouseleave", (e: MouseEvent) => {
						const relatedTarget = e.relatedTarget as HTMLElement;
						if (relatedTarget && !itemEl.contains(relatedTarget) && !this.isInsideSubMenu(relatedTarget)) {
							this.hideSubMenu(itemEl);
						}
					});
				} else {
					itemEl.addEventListener("click", (e) => {
						e.stopPropagation();
						executeAction(item, this.onAction);
						this.destroy();
					});
				}
			}

			menu.appendChild(itemEl);
		});

		return menu;
	}

	/**
	 * Affiche un sous-menu.
	 *
	 * @param {HTMLElement} parentEl - L'élément parent.
	 * @param {ContextMenuItem[]} items - Les items du sous-menu.
	 * @private
	 */
	private showSubMenu(parentEl: HTMLElement, items: ContextMenuItem[]): void {
		const subMenu = this.createMenuElement(items);
		subMenu.classList.add("context-menu__sub-menu");
		parentEl.appendChild(subMenu);
		this.activeSubMenus.push(subMenu);

		adjustSubMenuPosition(subMenu);
	}

	/**
	 * Cache un sous-menu.
	 *
	 * @param {HTMLElement} parentEl - L'élément parent.
	 * @private
	 */
	private hideSubMenu(parentEl: HTMLElement): void {
		const subMenu = parentEl.querySelector(".context-menu__sub-menu");
		if (subMenu) {
			subMenu.remove();
			this.activeSubMenus = this.activeSubMenus.filter(s => s !== subMenu);
		}
	}

	/**
	 * Vérifie si un élément est à l'intérieur d'un sous-menu actif.
	 *
	 * @param {HTMLElement} el - L'élément à vérifier.
	 * @returns {boolean} True si à l'intérieur.
	 * @private
	 */
	private isInsideSubMenu(el: HTMLElement): boolean {
		return this.activeSubMenus.some(subMenu => subMenu.contains(el));
	}

	/**
	 * Gère le clic à l'extérieur pour fermer le menu.
	 *
	 * @param {MouseEvent} event - L'événement clic.
	 * @private
	 */
	private handleOutsideClick(event: MouseEvent): void {
		if (this.menuElement && !this.menuElement.contains(event.target as Node)) {
			this.destroy();
		}
	}
}
