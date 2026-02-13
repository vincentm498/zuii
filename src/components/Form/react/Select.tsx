import { useEffect, useRef } from 'react';
import { initSelect } from '../js/select';

/**
 * Option pour le composant Select.
 */
interface Option {
	text: string;
	value: string;
}

/**
 * Propriétés du composant Select.
 */
interface Props {
	/**
	 * Liste des options.
	 */
	options: Option[];
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
}

/**
 * Composant Select premium basé sur Choices.js.
 *
 * @param {Props} props - Les propriétés du composant.
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
}: Props) => {
	const selectRef = useRef<HTMLSelectElement>(null);
	const choicesRef = useRef<any>(null);

	useEffect(() => {
		if (!options) return;

		if (selectRef.current) {
			// Nettoyer pour éviter les doublons
			selectRef.current.innerHTML = '';

			const choicesOptions = options.map(opt => ({
				value: opt.value,
				label: opt.text,
				selected: Array.isArray(value) ? value.includes(opt.value) : value === opt.value
			}));

			choicesRef.current = initSelect(selectRef.current, {
				choices: choicesOptions,
				removeItemButton: multiple,
				placeholderValue: placeholder,
				searchEnabled: searchable,
				silent: true
			}, onChange);
		}

		return () => {
			if (choicesRef.current) {
				choicesRef.current.destroy();
				choicesRef.current = null;
			}
		};
	}, [options, multiple, placeholder, onChange]);

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
				className="zuii-select"
				name={name}
			/>
		</div>
	);
};
