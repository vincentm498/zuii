import { useEffect, useRef } from 'react';
import '../style/index.scss';
import { initLanguageSelector } from '../js/language-selector';

/**
 * Interface pour les options de langue
 */
interface Language {
	code: string;
	label: string;
	flag: string;
}

/**
 * Props du composant LangSelector
 */
interface Props {
	languages: Language[];
	currentLanguage: string;
	onChange?: (value: string) => void;
}

/**
 * Composant de sélection de langue
 *
 * @param {Props} props - Les propriétés du composant
 * @returns {JSX.Element}
 */
export const LangSelector = ({ languages, currentLanguage, onChange }: Props) => {
	const selectRef = useRef<HTMLSelectElement>(null);
	const tsInstance = useRef<any>(null);

	/**
	 * Met à jour l'attribut lang de la balise html
	 */
	useEffect(() => {
		if (currentLanguage) {
			document.documentElement.lang = currentLanguage;
		}
	}, [currentLanguage]);

	/**
	 * Initialise TomSelect
	 */
	useEffect(() => {
		if (selectRef.current && !tsInstance.current) {
			tsInstance.current = initLanguageSelector(selectRef.current, (value) => {
				if (onChange) onChange(value);
			});
		}

		return () => {
			if (tsInstance.current) {
				tsInstance.current.destroy();
				tsInstance.current = null;
			}
		};
	}, [onChange]);

	/**
	 * Synchronise la valeur de TomSelect si currentLanguage change de l'extérieur
	 */
	useEffect(() => {
		if (tsInstance.current && tsInstance.current.getValue() !== currentLanguage) {
			tsInstance.current.setValue(currentLanguage, true);
		}
	}, [currentLanguage]);

	return (
		<div className="lang-selector__wrapper">
			<select
				ref={selectRef}
				id="language-select"
				className="lang-selector"
				defaultValue={currentLanguage}
			>
				{languages.map((lang) => (
					<option key={lang.code} value={lang.code} data-src={lang.flag}>
						{lang.label}
					</option>
				))}
			</select>
		</div>
	);
};
