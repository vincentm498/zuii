import { useState, useEffect } from "react";
import { Form as BootstrapForm, InputGroup } from "react-bootstrap";
import { calculateDecrement, calculateIncrement } from "../js/form";
import { Icon } from "../../Icon/react";

/**
 * Propriétés du composant NumberInput.
 */
export interface NumberInputProps {
	/**
	 * Id de l'input.
	 */
	id?: string;
	/**
	 * Name de l'input.
	 */
	name?: string;
	/**
	 * Valeur actuelle de l'input.
	 */
	value?: number;
	/**
	 * Callback lors du changement de valeur.
	 * @param {number} value - La nouvelle valeur.
	 */
	onChange?: (value: number) => void;
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
	/**
	 * Indique si le champ est requis.
	 */
	required?: boolean;
}

/**
 * Composant NumberInput avec boutons +/- personnalisés.
 *
 * @param {NumberInputProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant NumberInput rendu.
 */
export const NumberInput = ({
	value: propsValue,
	onChange,
	min,
	max,
	step = 1,
	className = "",
	placeholder,
	id,
	name,
	required,
}: NumberInputProps) => {
	const bemClass = "number-input";

	// État interne pour supporter le mode non contrôlé
	const [internalValue, setInternalValue] = useState<number>(propsValue ?? 0);

	// Synchronise l'état interne si la prop value change (mode contrôlé)
	useEffect(() => {
		if (propsValue !== undefined) {
			setInternalValue(propsValue);
		}
	}, [propsValue]);

	const currentValue = propsValue !== undefined ? propsValue : internalValue;

	/**
	 * Met à jour la valeur et appelle onChange si présent.
	 */
	const updateValue = (newValue: number) => {
		if (propsValue === undefined) {
			setInternalValue(newValue);
		}
		if (onChange) {
			onChange(newValue);
		}
	};

	const handleIncrement = () => {
		updateValue(calculateIncrement(currentValue, step, max));
	};

	const handleDecrement = () => {
		updateValue(calculateDecrement(currentValue, step, min));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(e.target.value);
		if (isNaN(newValue)) {
			updateValue(0);
			return;
		}

		let clampedValue = newValue;
		if (min !== undefined && clampedValue < min) {
			clampedValue = min;
		}
		if (max !== undefined && clampedValue > max) {
			clampedValue = max;
		}

		updateValue(clampedValue);
	};

	return (
		<InputGroup className={`${bemClass} ${className}`.trim()}>
			<InputGroup.Text className={`${bemClass}__addon`} onClick={handleDecrement}>
				<Icon name="icon-minus" size="sm" />
			</InputGroup.Text>

			<BootstrapForm.Control
				id={id}
				type="number"
				className={`${bemClass}__control`}
				value={currentValue}
				onChange={handleChange}
				placeholder={placeholder}
				min={min}
				max={max}
				step={step}
				required={required}
			/>

			<InputGroup.Text className={`${bemClass}__addon`} onClick={handleIncrement}>
				<Icon name="icon-plus" size="sm" />
			</InputGroup.Text>

			{/* Input caché pour la récupération de la valeur dans un formulaire standard */}
			{name && (
				<input
					type="hidden"
					name={name}
					value={currentValue}
				/>
			)}
		</InputGroup>
	);
};

