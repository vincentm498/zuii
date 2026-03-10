import { useEffect, useRef, useState } from "react";
import { Form as BootstrapForm } from "react-bootstrap";
import intlTelInput from "intl-tel-input";
import { getDefaultCountry, watchLanguageChange } from "../js/tel-input";

/**
 * Propriétés du composant TelInput.
 */
export interface TelInputProps {
	/**
	 * Valeur actuelle du numéro.
	 */
	value?: string;
	/**
	 * Callback lors du changement de valeur.
	 * @param {string} value - Le numéro complet au format international.
	 */
	onChange?: (value: string) => void;
	/**
	 * Pays par défaut (ex: "fr").
	 */
	initialCountry?: any;
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
 * Composant TelInput utilisant intl-tel-input.
 *
 * @param {TelInputProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant TelInput rendu.
 */
export const TelInput = ({
	value,
	onChange,
	initialCountry,
	className = "",
	placeholder,
	disabled = false,
}: TelInputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const itiRef = useRef<any>(null);

	const [country, setCountry] = useState(initialCountry || getDefaultCountry());

	// Surveiller les changements de langue du site
	useEffect(() => {
		const observer = watchLanguageChange(initialCountry, (newCountry) => {
			setCountry(newCountry);
		});

		return () => {
			if (observer) observer.disconnect();
		};
	}, [initialCountry]);

	useEffect(() => {
		if (inputRef.current) {
			itiRef.current = intlTelInput(inputRef.current, {
				initialCountry: country,
				loadUtils: () => import("intl-tel-input/utils"),
				separateDialCode: true,
				strictMode: true,
			});

			const handleChange = () => {
				if (onChange) {
					onChange(itiRef.current.getNumber());
				}
			};

			inputRef.current.addEventListener("change", handleChange);
			inputRef.current.addEventListener("blur", handleChange);

			return () => {
				if (itiRef.current) {
					itiRef.current.destroy();
				}
			};
		}
	}, [country]);

	// Mise à jour de la valeur si elle change depuis l'extérieur (optionnel, dépend de la stratégie d'état)
	useEffect(() => {
		if (itiRef.current && value !== undefined && value !== itiRef.current.getNumber()) {
			itiRef.current.setNumber(value);
		}
	}, [value]);

	return (
		<div className={`tel-input-wrapper form__input ${className}`.trim()}>
			<BootstrapForm.Control
				ref={inputRef}
				type="tel"
				placeholder={placeholder}
				disabled={disabled}
				className="tel-input-control "
			/>
		</div>
	);
};
