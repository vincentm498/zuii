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

	const languagesNoLabel = [
		{ code: 'fr', flag: 'fr' },
		{ code: 'en',flag: 'gb' },
		{ code: 'de',flag: 'de' },
		{ code: 'es',flag: 'es' }
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

			<section className="mt-4">
				<h2>Sélecteur (Sans Label)</h2>
				<p>
					Variante affichant uniquement les drapeaux.
				</p>

				<LangSelector
					options={languagesNoLabel.map(l => ({ value: l.code, flag: l.flag }))}
					defaultValue={lang}
					onChange={setLang}
				/>
			</section>

			<section className="mt-4">
				<h2>Sélecteur avec Recherche</h2>
				<p>
					Option <code>search={"{true}"}</code> activée.
				</p>

				<LangSelector
					options={languages.map(l => ({ value: l.code, label: l.label, flag: l.flag }))}
					defaultValue={lang}
					onChange={setLang}
					search={true}
				/>
			</section>

			<section className="mt-4">
				<h2>Sélecteur sans valeur par défaut</h2>
				<p>
					Option <code>hasDefault={"{false}"}</code> avec un placeholder.
				</p>

				<LangSelector
					options={languages.map(l => ({ value: l.code, label: l.label, flag: l.flag }))}
					onChange={(val) => console.log('Nouvelle langue:', val)}
					hasDefault={false}
					placeholder="Choisir une langue"
				/>
			</section>


		</div>
	);
};
