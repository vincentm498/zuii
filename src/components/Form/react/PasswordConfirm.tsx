import { useState, useEffect } from "react";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import { Icon } from "../../Icon/react";

/**
 * Propriétés du composant PasswordConfirm.
 */
interface Props {
	/**
	 * Le mot de passe original à comparer.
	 */
	passwordToMatch: string;
	/**
	 * Valeur actuelle de la confirmation.
	 */
	value?: string;
	/**
	 * Callback lors du changement de valeur.
	 * @param {string} value - La nouvelle valeur de confirmation.
	 * @param {boolean} isValid - Si les mots de passe correspondent.
	 */
	onChange?: (value: string, isValid: boolean) => void;
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
 * Composant PasswordConfirm avec validation en temps réel.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant PasswordConfirm rendu.
 */
export const PasswordConfirm = ({
	passwordToMatch,
	value = "",
	onChange,
	className = "",
	placeholder = "Confirmez le mot de passe",
	disabled = false,
}: Props) => {
	const [showPassword, setShowPassword] = useState(false);
	const [isValid, setIsValid] = useState(true);
	const bemClass = "password-confirm";

	useEffect(() => {
		const match = value === passwordToMatch;
		setIsValid(value === "" || match);
		// Note: On considère valide si vide pour éviter le rouge immédiat,
		// mais le callback peut remonter l'info exacte.
	}, [value, passwordToMatch]);

	const toggleVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleChange = (val: string) => {
		const match = val === passwordToMatch;
		onChange?.(val, match);
	};

	return (
		<InputGroup className={`${bemClass} ${className}`.trim()} hasValidation>
			<BootstrapForm.Control
				type={showPassword ? "text" : "password"}
				value={value}
				onChange={(e) => handleChange(e.target.value)}
				placeholder={placeholder}
				disabled={disabled}
				isInvalid={!isValid && value !== ""}
				isValid={isValid && value !== "" && value === passwordToMatch}
				className={`${bemClass}__control`}
			/>
			<InputGroup.Text
				className={`${bemClass}__toggle`}
				onClick={toggleVisibility}
				style={{ cursor: "pointer" }}
			>
				<Icon name={showPassword ? "icon-eye" : "icon-eye-closed"} size="sm" />
			</InputGroup.Text>
			<BootstrapForm.Control.Feedback type="invalid">
				Les mots de passe ne correspondent pas.
			</BootstrapForm.Control.Feedback>
		</InputGroup>
	);
};
