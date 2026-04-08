import { useState } from 'react';
import { Menu } from '../src/components/Menu/react/index';
import { LangSelector } from '../src/components/Lang-selector/react/index';

export const MenuTemplate = () => {
	const [lang, setLang] = useState('fr');

	const languages = [
		{ code: 'fr', label: 'Français', flag: 'fr' },
		{ code: 'en', label: 'English', flag: 'gb' },
		{ code: 'de', label: 'Deutsch', flag: 'de' },
		{ code: 'es', label: 'Español', flag: 'es' }
	];



	return (
		<Menu>
			<LangSelector
				options={languages.map(l => ({ value: l.code, label: l.label, flag: l.flag }))}
				defaultValue={lang}
				onChange={setLang}
			/>
		</Menu>
	);
};
