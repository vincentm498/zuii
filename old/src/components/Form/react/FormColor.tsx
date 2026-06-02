
import { useEffect, useRef, useState } from "react";
import Pickr from '@simonwep/pickr';
import { initColorPicker } from "../js/color";

/**
 * Propriétés du composant FormColor.
 */
export interface FormColorProps {
	/**
	 * Valeur actuelle de la couleur (format HEX).
	 */
	value?: string;
	/**
	 * Callback lors du changement de couleur.
	 * @param {string} value - La nouvelle couleur au format HEX.
	 */
	onChange?: (value: string) => void;
	/**
	 * Désactiver le composant.
	 */
	disabled?: boolean;
	/**
	 * Nom du champ pour le formulaire.
	 */
	name?: string;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Couleurs prédéfinies (swatches).
	 */
	swatches?: string[];
}

/**
 * Composant de sélection de couleur premium basé sur Pickr.
 *
 * @param {FormColorProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant FormColor rendu.
 */
export const FormColor = ({
	value,
	onChange,
	disabled = false,
	name,
	className = "",
	swatches = [
		'#F44336',
		'#E91E63',
		'#9C27B4',
		'#673AB7',
		'#3F51B5',
		'#2196F3',
		'#03A9F4',
		'#00BCD4',
		'#009688',
		'#4CAF50',
		'#8BC34A',
		'#CDDC39',
		'#FFEB3B',
		'#FFC107'
	],
}: FormColorProps) => {
	const pickerRef = useRef<HTMLDivElement>(null);
	const pickerInstanceRef = useRef<Pickr | null>(null);
	const [inputVal, setInputVal] = useState(value || '');

	useEffect(() => {
		if (pickerRef.current) {
			pickerInstanceRef.current = initColorPicker(
				pickerRef.current,
				value || '#ffffff',
				swatches,
				(hexColor) => {
					setInputVal(hexColor);
					if (onChange) onChange(hexColor);
				}
			);
		}

		return () => {
			if (pickerInstanceRef.current) {
				pickerInstanceRef.current.destroy();
			}
		};
	}, []);

	// Mise à jour de la valeur si elle change depuis l'extérieur
	useEffect(() => {
		if (value !== undefined && value !== inputVal) {
			setInputVal(value);
			if (pickerInstanceRef.current) {
				pickerInstanceRef.current.setColor(value);
			}
		}
	}, [value]);

	return (
		<div className={`form__input form__input--color ${className}`.trim()}>
			<div
				ref={pickerRef}
				className="color-selection"
				style={{ backgroundColor: inputVal || 'transparent' }}
			></div>
			<input
				type="hidden"
				name={name}
				value={inputVal}
				disabled={disabled}
				readOnly
			/>
		</div>
	);
};


