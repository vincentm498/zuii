import { Form as BootstrapForm, FormProps, InputGroup } from "react-bootstrap";
import { Icon } from "../../Icon/react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import "../style/index.scss";
import { NumberInput } from "./NumberInput";
import { TelInput } from "./TelInput";
import { PasswordInput } from "./PasswordInput";
import { PasswordConfirm } from "./PasswordConfirm";
import { RangeInput } from "./RangeInput";
import { FileInput } from "./FileInput";
import { Select } from "./Select";
import { handleNumericKeyDown } from "../js/number";

/**
 * Propriétés du composant FormControl.
 */
interface FormControlProps extends React.ComponentPropsWithRef<typeof BootstrapForm.Control> {
	/**
	 * Le libellé du champ (utilisé si floating est actif).
	 */
	label?: string;
	/**
	 * Si vrai, utilise un FloatingLabel.
	 */
	floating?: boolean;
	/**
	 * Nom de l'icône à afficher.
	 */
	icon?: string;
}

/**
 * Composant FormControl étendu.
 * Permet d'utiliser l'option floating directement via les props.
 *
 * @param {FormControlProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant FormControl rendu.
 */
const FormControl = ({
	label,
	floating,
	icon,
	children,
	onKeyDown,
	...props
}: FormControlProps) => {
	/**
	 * Gère l'événement onKeyDown pour restreindre la saisie numérique via la logique métier.
	 */
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (props.type === "number") {
			handleNumericKeyDown(e);
		}
		if (onKeyDown) onKeyDown(e);
	};

	const inputMode = props.type === "number" ? "decimal" : undefined;

	if (floating && label) {
		return (
			<FloatingLabel label={label} controlId={props.id || props.name}>
				<div className="form__input">
					{icon && <Icon name={icon} size="sm" />}
					<BootstrapForm.Control
						{...props}
						onKeyDown={handleKeyDown}
						inputMode={inputMode}
					>
						{children}
					</BootstrapForm.Control>
				</div>
			</FloatingLabel>
		);
	}

	return (
		<div className="form__input">
			{icon && <Icon name={icon} size="sm" />}
			<BootstrapForm.Control
				{...props}
				onKeyDown={handleKeyDown}
				inputMode={inputMode}
			>
				{children}
			</BootstrapForm.Control>
		</div>
	);
};

interface Props extends FormProps {
	/**
	 * Le titre optionnel du formulaire.
	 */
	titre?: string;
	/**
	 * Contenu du formulaire.
	 */
	children?: React.ReactNode;
}

/**
 * Composant Form personnalisé.
 * Basé sur React Bootstrap Form.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant Form rendu.
 */
export const Form = ({
	titre,
	className = "",
	children,
	...props
}: Props) => {
	const bemClass = "form";

	return (
		<BootstrapForm className={`${bemClass} ${className}`.trim()} {...props}>
			{titre && <h1 className={`${bemClass}__title`}>{titre}</h1>}
			{children}
		</BootstrapForm>
	);
};

// Exposition des sous-composants pour un usage atomique
Form.Group = BootstrapForm.Group;
Form.Control = FormControl;
Form.Label = BootstrapForm.Label;
Form.Text = BootstrapForm.Text;
Form.Check = BootstrapForm.Check;
Form.Select = Select; // Remplacement par le composant premium
Form.InputGroup = InputGroup;
Form.Number = NumberInput;
Form.Tel = TelInput;
Form.Password = PasswordInput;
Form.PasswordConfirm = PasswordConfirm;
Form.Range = RangeInput;
Form.File = FileInput;
Form.FloatingLabel = FloatingLabel;
