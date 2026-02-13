import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss'
import { Buttons, Icons, Avatars, Badges, Colors, Dividers, ContextMenus, LangSelectors, Forms, Shadows, Radius, FormsElements, Dropdowns, Logos, Modals, Placeholders, Tooltips, Tables, TabsTemplate, Accordions, Alerts } from '../src/templates'




ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<div style={{ padding: '20px' }}>
			<FormsElements />
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
