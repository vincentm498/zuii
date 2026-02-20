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
	className = ''
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
				selected: opt.value === defaultValue
			}));

			choicesRef.current = initLanguageSelector(selectRef.current, updatedOptions, onChange);
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
