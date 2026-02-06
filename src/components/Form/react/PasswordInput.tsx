import { useState } from "react";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import { Icon } from "../../Icon/react";


/**
 * Propriétés du composant PasswordInput.
 */
interface Props {
	/**
	 * Valeur actuelle du mot de passe.
	 */
	value?: string;
	/**
	 * Callback lors du changement de valeur.
	 * @param {string} value - Le nouveau mot de passe.
	 */
	onChange?: (value: string) => void;
	/**
	 * Classe CSS additionnelle pour le conteneur.
	 */
	className?: string;
	/**
	 * Placeholder de l'input.
	 */
	placeholder?: string;
	/**
	 * Si l'input est désactivé.
	 */
	disabled?: boolean;
}

/**
 * Composant PasswordInput avec bouton de visibilité.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant PasswordInput rendu.
 */
export const PasswordInput = ({
	value,
	onChange,
	className = "",
	placeholder = "Mot de passe",
	disabled = false,
}: Props) => {
	const [showPassword, setShowPassword] = useState(false);
	const bemClass = "password-input";

	const toggleVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<InputGroup className={`${bemClass} ${className}`.trim()}>
			<BootstrapForm.Control
				type={showPassword ? "text" : "password"}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				placeholder={placeholder}
				disabled={disabled}
				className={`${bemClass}__control`}
			/>
			<InputGroup.Text
				className={`${bemClass}__toggle`}
				onClick={toggleVisibility}
				style={{ cursor: "pointer" }}
			>
				<Icon name={showPassword ? "icon-eye" : "icon-eye-closed"} size="sm" />
			</InputGroup.Text>
		</InputGroup>
	);
};
