import { useState } from 'react';
import { LangSelector } from '../../index';

/**
 * Template de démonstration pour le sélecteur de langue.
 * @returns {JSX.Element} Le composant de démonstration.
 */
export const LangSelectors = () => {
	const [lang, setLang] = useState('fr');

	const languages = [
		{ code: 'fr', label: 'Français', flag: 'fr' },
		{ code: 'en', label: 'English', flag: 'gb' },
		{ code: 'de', label: 'Deutsch', flag: 'de' },
		{ code: 'es', label: 'Español', flag: 'es' }
	];

	return (
		<div>
			<section>
				<h2>Sélecteur de Langue Standard</h2>
				<p>
					Un composant de sélection de langue utilisant Tom Select et flag-icons.
				</p>

				<LangSelector
					languages={languages}
					currentLanguage={lang}
					onChange={setLang}
				/>

				<div>
					Langue sélectionnée : <strong>{lang}</strong>
				</div>
			</section>


		</div>
	);
};
