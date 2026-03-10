import { useEffect, useRef } from 'react';
import { initSelect } from '../js/select';
import { Icon } from '../../Icon/react';

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
	/**
	 * Nom de l'icône à afficher.
	 */
	icon?: string;
	/**
	 * Langue pour les traductions (ex: 'fr', 'en').
	 */
	lang?: string;
}

/**
 * Traductions pour le composant Select.
 */
const SELECT_TRANSLATIONS: Record<string, any> = {
	fr: {
		placeholder: "Sélectionnez une option",
		noResultsText: "Aucun résultat trouvé",
		noChoicesText: "Aucun choix disponible",
		uniqueItemText: "Seules les valeurs uniques peuvent être ajoutées",
		customAddItemText: "Seules les valeurs correspondant à un critère spécifique peuvent être ajoutées",
		addItemText: (value: string) => `Appuyez sur Entrée pour ajouter **${value}**`,
		maxItemText: (maxItemCount: number) => `Seulement ${maxItemCount} options peuvent être sélectionnées`,
	},
	en: {
		placeholder: "Select an option",
		noResultsText: "No results found",
		noChoicesText: "No choices to choose from",
		uniqueItemText: "Only unique values can be added",
		customAddItemText: "Only values matching specific conditions can be added",
		addItemText: (value: string) => `Press Enter to add **${value}**`,
		maxItemText: (maxItemCount: number) => `Only ${maxItemCount} options can be selected`,
	},
};

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
	icon,
	lang,
}: SelectProps) => {
	const selectRef = useRef<HTMLSelectElement>(null);
	const choicesRef = useRef<any>(null);
	const onChangeRef = useRef(onChange);
	const valueRef = useRef(value);

	// Déterminer la langue et les traductions
	const activeLang = lang || (typeof document !== 'undefined' ? document.documentElement.lang : 'fr') || 'fr';
	const i18n = SELECT_TRANSLATIONS[activeLang.startsWith('en') ? 'en' : 'fr'];
	const activePlaceholder = placeholder === "Sélectionnez une option" ? i18n.placeholder : placeholder;

	// Garder les refs à jour sans déclencher d'effet inutile
	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

	useEffect(() => {
		valueRef.current = value;
	}, [value]);

	const optionsKey = JSON.stringify(options);

	useEffect(() => {

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
					label: activePlaceholder,
					selected: currentVal === undefined || currentVal === '',
					placeholder: true
				} as any);
			}

			choicesRef.current = initSelect(selectRef.current, {
				choices: choicesOptions,
				removeItemButton: multiple,
				placeholderValue: activePlaceholder,
				searchEnabled: searchable,
				silent: true,
				variant,
				...i18n
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
	}, [optionsKey, multiple, activePlaceholder, variant, searchable, i18n]);

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
			{icon && <Icon name={icon} size="sm" />}
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
