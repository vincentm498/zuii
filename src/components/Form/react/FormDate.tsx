
import { forwardRef, useEffect, useRef, useState, useMemo } from "react";
import { Form as BootstrapForm } from "react-bootstrap";
import { Icon } from "../../Icon/react";
import { initDatePicker, formatHiddenDateValue, getRangeSeparator } from "../js/date";

/**
 * Propriétés du composant FormDate.
 */
export interface FormDateProps {
	/**
	 * Options spécifiques pour flatpickr.
	 */
	flatpickrOptions?: any;
	/**
	 * Valeur actuelle de la date.
	 */
	value?: string;
	/**
	 * Callback lors du changement de date.
	 * @param {string} dateStr - La date sélectionnée au format texte.
	 */
	onChange?: (dateStr: string) => void;
	/**
	 * Texte d'aide si vide.
	 */
	placeholder?: string;
	/**
	 * Nom du champ pour le formulaire.
	 */
	name?: string;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Icône à afficher (par défaut: "icon-calendar").
	 */
	icon?: string;
	/**
	 * Désactiver le champ.
	 */
	disabled?: boolean;
}

/**
 * Composant de sélection de date premium basé sur Flatpickr.
 *
 * @param {FormDateProps} props - Les propriétés du composant.
 * @param {React.Ref<HTMLInputElement>} ref - Référence vers l'input visible.
 * @returns {JSX.Element} Le composant FormDate rendu.
 *
 */
export const FormDate = forwardRef<HTMLInputElement, FormDateProps>(({
	flatpickrOptions,
	value = "",
	onChange,
	placeholder,
	name,
	className = "",
	icon,
	disabled = false,
	...props
}, ref) => {
	const visibleInputRef = ref as any;
	const hiddenPickerRef = useRef<HTMLInputElement>(null);
	const positionRef = useRef<HTMLSpanElement>(null);

	const flatpickrInstance = useRef<any>(null);
	const [inputVal, setInputVal] = useState(value || "");

	const separator = useMemo(() => {
		return getRangeSeparator(flatpickrOptions?.locale);
	}, [flatpickrOptions?.locale]);

	useEffect(() => {
		if (!hiddenPickerRef.current) return;

		flatpickrInstance.current = initDatePicker(
			hiddenPickerRef.current,
			flatpickrOptions,
			positionRef.current,
			(dateStr) => {
				setInputVal(dateStr);
				onChange?.(dateStr);
			}
		);

		return () => flatpickrInstance.current?.destroy();
	}, [flatpickrOptions, onChange]);

	useEffect(() => {
		if (value !== undefined && value !== inputVal) {
			setInputVal(value || "");
			flatpickrInstance.current?.setDate(value || "", false);
		}
	}, [value]);

	const handleOpen = () => {
		if (!disabled) {
			flatpickrInstance.current?.open();
		}
	};

	return (
		<div className={`form__input ${className}`.trim()}>
			{icon && <Icon name={icon} size="sm" />}
			<BootstrapForm.Control
				{...props}
				ref={visibleInputRef}
				autoComplete="off"
				value={inputVal}
				onClick={handleOpen}
				readOnly
				disabled={disabled}
				placeholder={placeholder}
				className="form-date-control"
			/>

			<span ref={positionRef} className="form-date-anchor"></span>

			<input ref={hiddenPickerRef} style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />
			<input type="hidden" name={name} value={formatHiddenDateValue(inputVal, separator, flatpickrInstance.current)} />
		</div>
	);
});


