import { Dropdown as BootstrapDropdown, DropdownProps } from "react-bootstrap";
import "../style/index.scss";

interface DropdownItem {
	label?: string;
	href?: string;
	type?: "divider" | "item";
	onClick?: () => void;
}

interface Props extends Omit<DropdownProps, "children"> {
	/**
	 * Le contenu du bouton de déclenchement.
	 */
	label?: React.ReactNode;
	/**
	 * La variante de couleur Bootstrap.
	 */
	variant?: string;
	/**
	 * Les éléments du menu.
	 */
	items?: DropdownItem[];
	/**
	 * Si le dropdown doit être aligné à droite.
	 */
	align?: "start" | "end";
	/**
	 * Contenu optionnel.
	 */
	children?: React.ReactNode;
	/**
	 * Fonction appelée lorsque le dropdown est ouvert.
	 */
	onClick?: () => void;
}

/**
 * Composant Dropdown personnalisé.
 * Basé sur React Bootstrap Dropdown.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant Dropdown rendu.
 */
export const Dropdown = ({
	label = "Dropdown",
	variant = "primary",
	items = [],
	align = "start",
	className = "",
	children,
	onClick,
	...props
}: Props) => {
	const bemClass = "dropdown";

	return (
		<BootstrapDropdown className={`${bemClass} ${className}`.trim()} align={align} {...props}>
			{children ? (
				children
			) : (
				<>
					<BootstrapDropdown.Toggle variant={variant} id={`dropdown-${label}`} className={`${bemClass}__toggle`}>
						{label}
					</BootstrapDropdown.Toggle>

					<BootstrapDropdown.Menu className={`${bemClass}__menu`}>
						{items.map((item, index) => {
							if (item.type === "divider") {
								return <BootstrapDropdown.Divider key={index} className={`${bemClass}__divider`} />;
							}
							return (
								<BootstrapDropdown.Item
									key={index}
									href={item.href}
									className={`${bemClass}__item`}
									onClick={item.onClick}
								>
									{item.label}
								</BootstrapDropdown.Item>
							);
						})}
					</BootstrapDropdown.Menu>
				</>
			)}
		</BootstrapDropdown>
	);
};

// Exposition des sous-composants avec injection des classes BEM zuii
Dropdown.Toggle = ({ className = "", ...props }: any) => (
	<BootstrapDropdown.Toggle className={`dropdown__toggle ${className}`.trim()} {...props} />
);

Dropdown.Menu = ({ className = "", ...props }: any) => (
	<BootstrapDropdown.Menu className={`dropdown__menu ${className}`.trim()} {...props} />
);

Dropdown.Item = ({ className = "", ...props }: any) => (
	<BootstrapDropdown.Item className={`dropdown__item ${className}`.trim()} {...props} />
);

Dropdown.Divider = ({ className = "", ...props }: any) => (
	<BootstrapDropdown.Divider className={`dropdown__divider ${className}`.trim()} {...props} />
);
