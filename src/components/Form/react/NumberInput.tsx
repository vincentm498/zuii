import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import "../style/index.scss";
import { calculateDecrement, calculateIncrement } from "../js/form";
import { Icon } from "../../Icon/react";

/**
 * Propriétés du composant NumberInput.
 */
interface Props {
	/**
	 * Valeur actuelle de l'input.
	 */
	value?: number;
	/**
	 * Callback lors du changement de valeur.
	 * @param {number} value - La nouvelle valeur.
	 */
	onChange: (value: number) => void;
	/**
	 * Valeur minimale (défaut: undefined).
	 */
	min?: number;
	/**
	 * Valeur maximale (défaut: undefined).
	 */
	max?: number;
	/**
	 * Pas d'incrémentation (défaut: 1).
	 */
	step?: number;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Texte d'aide ou de placeholder.
	 */
	placeholder?: string;
}

/**
 * Composant NumberInput avec boutons +/- personnalisés.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant NumberInput rendu.
 */
export const NumberInput = ({
	value = 0,
	onChange,
	min,
	max,
	step = 1,
	className = "",
	placeholder,
}: Props) => {
	const bemClass = "number-input";

	const handleIncrement = () => {
		onChange(calculateIncrement(value, step, max));
	};

	const handleDecrement = () => {
		onChange(calculateDecrement(value, step, min));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(e.target.value);
		if (isNaN(newValue)) {
			onChange(0); // Ou une autre valeur par défaut
			return;
		}

		if (min !== undefined && newValue < min) {
			onChange(min);
			return;
		}
		if (max !== undefined && newValue > max) {
			onChange(max);
			return;
		}

		onChange(newValue);
	};

	return (
		<InputGroup className={`${bemClass} ${className}`.trim()}>
			<InputGroup.Text className={`${bemClass}__addon`} onClick={handleDecrement}>
				<Icon name="icon-minus" size="sm" />
			</InputGroup.Text>

			<BootstrapForm.Control
				type="number"
				className={`${bemClass}__control`}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				min={min}
				max={max}
				step={step}
			/>

			<InputGroup.Text className={`${bemClass}__addon`} onClick={handleIncrement}>
				<Icon name="icon-plus" size="sm" />
			</InputGroup.Text>
		</InputGroup>
	);
};
