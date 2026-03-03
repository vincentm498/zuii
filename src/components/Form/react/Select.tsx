import { useEffect, useRef } from 'react';
import { initSelect } from '../js/select';

/**
 * Option pour le composant Select.
 */
export interface SelectOption {
	text: string;
	value: string;
	/**
	 * Code du drapeau (ex: 'fr', 'en').
	 */
	flag?: string;
}

/**
 * Propriétés du composant Select.
 */
export interface SelectProps {
	/**
	 * Liste des options.
	 */
	options: SelectOption[];
	/**
	 * Valeurs sélectionnées.
	 */
	value?: string | string[];
	/**
	 * Callback lors du changement.
	 */
	onChange?: (value: string | string[]) => void;
	/**
	 * Permettre la sélection multiple.
	 */
	multiple?: boolean;
	/**
	 * Texte de recherche si vide.
	 */
	placeholder?: string;
	/**
	 * Désactiver le composant.
	 */
	disabled?: boolean;
	/**
	 * Activer/Désactiver la recherche (par défaut: true).
	 */
	searchable?: boolean;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Nom du champ.
	 */
	name?: string;
	/**
	 * Variante du sélecteur.
	 * @default 'default'
	 */
	variant?: 'default' | 'country';
}

/**
 * Composant Select premium basé sur Choices.js.
 *
 * @param {SelectProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant Select rendu.
 */
export const Select = ({
	options,
	value,
	onChange,
	multiple = false,
	placeholder = "Sélectionnez une option",
	disabled = false,
	searchable = true,
	className = "",
	name,
	variant = "default",
}: SelectProps) => {
	const selectRef = useRef<HTMLSelectElement>(null);
	const choicesRef = useRef<any>(null);
	const onChangeRef = useRef(onChange);
	const valueRef = useRef(value);

	// Garder les refs à jour sans déclencher d'effet inutile
	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

	useEffect(() => {
		valueRef.current = value;
	}, [value]);

	const optionsKey = JSON.stringify(options);

	useEffect(() => {
		if (!options || options.length === 0) return;

		if (selectRef.current) {
			// Nettoyer pour éviter les doublons
			selectRef.current.innerHTML = '';

			const currentVal = value ?? valueRef.current;
			const choicesOptions = options.map(opt => ({
				value: opt.value,
				label: opt.text,
				selected: Array.isArray(currentVal) ? currentVal.includes(opt.value) : currentVal === opt.value,
				customProperties: {
					flag: opt.flag
				}
			}));

			// Ajouter une option de placeholder si non multiple pour éviter la sélection auto de la première option
			if (!multiple) {
				choicesOptions.unshift({
					value: '',
					label: placeholder,
					selected: currentVal === undefined || currentVal === '',
					placeholder: true
				} as any);
			}

			choicesRef.current = initSelect(selectRef.current, {
				choices: choicesOptions,
				removeItemButton: multiple,
				placeholderValue: placeholder,
				searchEnabled: searchable,
				silent: true,
				variant
			}, (val) => {
				valueRef.current = val;
				if (onChangeRef.current) {
					onChangeRef.current(val);
				}
			});
		}

		return () => {
			if (choicesRef.current) {
				choicesRef.current.destroy();
				choicesRef.current = null;
			}
		};
	}, [optionsKey, multiple, placeholder, variant, searchable]);

	// Mise à jour de la valeur si elle change de l'extérieur
	useEffect(() => {
		if (choicesRef.current && value !== undefined) {
			const currentValue = choicesRef.current.getValue(true);
			const newValue = Array.isArray(value) ? value : [value];
			const currentArray = Array.isArray(currentValue) ? currentValue : [currentValue];

			// Comparaison simple pour éviter les boucles de mise à jour inutiles
			if (JSON.stringify(newValue.sort()) !== JSON.stringify(currentArray.sort())) {
				choicesRef.current.setChoiceByValue(value);
			}
		}
	}, [value]);

	return (
		<div className={`form__input ${className}`.trim()}>
			<select
				ref={selectRef}
				multiple={multiple}
				disabled={disabled}
				className="select"
				name={name}
			/>
		</div>
	);
};
