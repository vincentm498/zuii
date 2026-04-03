import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss'
import { Buttons, Icons, Avatars, Badges, Colors, Dividers, ContextMenus, LangSelectors, Forms, Shadows, Radius, FormsElements, Dropdowns, Logos, Modals, Placeholders, Tooltips, Tables, TabsTemplate, Accordions, Alerts, Loaders, Grids, Sliders, Cards, Groups, Calendars  } from '../src/templates'

import { initCookieConsent } from '../packages/cookie-consent/src/js/cookie-consent';

const CookieConsent = () => {
	useEffect(() => {
		initCookieConsent();
	}, []); // Le tableau vide [] assure que ça ne s'exécute qu'une fois
	return null; // Le composant ne rend rien lui-même, il initialise juste la modale
};


ReactDOM.createRoot(document.getElementById('root')!).render(

	<React.StrictMode>
		<CookieConsent />
		<div style={{ padding: '20px' }}>
			<Calendars />
			<hr style={{ margin: '20px 0' }} />
			<FormsElements />
			<hr style={{ margin: '20px 0' }} />
			<Groups />
			<hr style={{ margin: '20px 0' }} />
			<Cards />
			<hr style={{ margin: '20px 0' }} />
			<Sliders />
			<hr style={{ margin: '20px 0' }} />
			<Grids />
			<hr style={{ margin: '20px 0' }} />
			<Loaders />
			<hr style={{ margin: '20px 0' }} />
			<Alerts />
			<hr style={{ margin: '20px 0' }} />
			<TabsTemplate />
			<hr style={{ margin: '20px 0' }} />
			<Accordions />
			<hr style={{ margin: '20px 0' }} />
			<Tables />
			<hr style={{ margin: '20px 0' }} />
			<Tooltips />
			<hr style={{ margin: '20px 0' }} />
			<Placeholders />
			<hr style={{ margin: '20px 0' }} />
			<Modals />
			<hr style={{ margin: '20px 0' }} />
			<Logos />
			<hr style={{ margin: '20px 0' }} />
			<Dropdowns />
			<hr style={{ margin: '20px 0' }} />
			<Colors />
			<hr style={{ margin: '20px 0' }} />
			<Shadows />
			<hr style={{ margin: '20px 0' }} />
			<Radius />
			<hr style={{ margin: '20px 0' }} />
			<Buttons />
			<hr style={{ margin: '20px 0' }} />
			<Icons />
			<hr style={{ margin: '20px 0' }} />
			<Avatars />
			<hr style={{ margin: '20px 0' }} />
			<Badges />
			<hr style={{ margin: '20px 0' }} />
			<Dividers />
			<hr style={{ margin: '20px 0' }} />
			<ContextMenus />
			<hr style={{ margin: '20px 0' }} />
			<LangSelectors />
			<hr style={{ margin: '20px 0' }} />


		</div>
	</React.StrictMode>
);
