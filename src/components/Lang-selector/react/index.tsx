import { useEffect, useRef } from 'react';
import { initLanguageSelector, LanguageOption } from '../js/language-selector';
import "../style/index.scss";

interface Props {
	/**
	 * Liste des langues disponibles.
	 */
	options: LanguageOption[];
	/**
	 * Valeur sélectionnée par défaut.
	 */
	defaultValue?: string;
	/**
	 * Callback appelé lors du changement de langue.
	 */
	onChange?: (value: string) => void;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Active la recherche dans le sélecteur.
	 */
	search?: boolean;
	/**
	 * Texte affiché si aucune langue n'est sélectionnée.
	 */
	placeholder?: string;
	/**
	 * Si vrai, une valeur par défaut est sélectionnée.
	 * @default true
	 */
	hasDefault?: boolean;
}

/**
 * Composant sélecteur de langue utilisant Choices.js.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant rendu.
 */
export const LangSelector = ({
	options,
	defaultValue,
	onChange,
	className = '',
	search = false,
	placeholder = '',
	hasDefault = true
}: Props) => {
	const selectRef = useRef<HTMLSelectElement>(null);
	const choicesRef = useRef<any>(null);

	useEffect(() => {
		if (!options || options.length === 0) return;

		if (selectRef.current) {
			// Nettoyer le select avant d'initialiser (évite les doublons)
			selectRef.current.innerHTML = '';

			const updatedOptions = options.map(opt => ({
				...opt,
				selected: hasDefault ? (defaultValue ? opt.value === defaultValue : false) : (opt.value === defaultValue)
			}));

			// Si hasDefault est activé et qu'aucune valeur n'est sélectionnée, on prend la première par défaut
			if (hasDefault && !updatedOptions.some(opt => opt.selected) && updatedOptions.length > 0) {
				updatedOptions[0].selected = true;
			}

			choicesRef.current = initLanguageSelector(
				selectRef.current,
				updatedOptions,
				onChange,
				search,
				placeholder
			);
		}

		return () => {
			if (choicesRef.current) {
				choicesRef.current.destroy();
				choicesRef.current = null;
			}
		};
	}, [options, defaultValue, onChange]);

	return (
		<div className={`form__input lang-selector ${className}`.trim()}>
			<select ref={selectRef} className="lang-selector__select" />
		</div>
	);
};
