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
					Un composant de sélection de langue utilisant Slim Select et flag-icons.
				</p>

				<LangSelector
					options={languages.map(l => ({ value: l.code, label: l.label, flag: l.flag }))}
					defaultValue={lang}
					onChange={setLang}
				/>

				<div>
					Langue sélectionnée : <strong>{lang}</strong>
				</div>
			</section>


		</div>
	);
};
