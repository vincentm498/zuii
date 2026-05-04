import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss'
import { Buttons, Icons, Avatars, Badges, Colors, Dividers, ContextMenus, LangSelectors, Forms, Shadows, Radius, FormsElements, Dropdowns, Logos, Modals, Placeholders, Tooltips, Tables, TabsTemplate, Accordions, Alerts, Loaders, Grids, Sliders, Cards, Groups, Calendars } from '../src/templates'
import { Footers } from '../packages/sections/footers/src/react/index';
import { Copyrights } from '../packages/sections/copyright/src/react/index';
import { socialMedia } from '../packages/components/social-media/src/react/index';
import { CTA } from '../packages/sections/CTA/src/react/index';


import { initCookieConsent } from '../packages/components/cookie-consent/src/js/cookie-consent';
import { MenuTemplate } from './menu';

const CookieConsent = () => {
	useEffect(() => {
		initCookieConsent();
	}, []); // Le tableau vide [] assure que ça ne s'exécute qu'une fois
	return null; // Le composant ne rend rien lui-même, il initialise juste la modale
};


import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

const components = [
	// Sections
	{ path: '/footer', name: 'Footer', component: Footers, category: 'Sections' },
	{ path: '/copyright', name: 'Copyright', component: Copyrights, category: 'Sections' },
	{ path: '/cta', name: 'CTA', component: CTA, category: 'Sections' },

	// Components
	{ path: '/accordions', name: 'Accordions', component: Accordions, category: 'Components' },
	{ path: '/alerts', name: 'Alerts', component: Alerts, category: 'Components' },
	{ path: '/avatars', name: 'Avatars', component: Avatars, category: 'Components' },
	{ path: '/badges', name: 'Badges', component: Badges, category: 'Components' },
	{ path: '/buttons', name: 'Buttons', component: Buttons, category: 'Components' },
	{ path: '/calendars', name: 'Calendars', component: Calendars, category: 'Components' },
	{ path: '/cards', name: 'Cards', component: Cards, category: 'Components' },
	{ path: '/context-menus', name: 'ContextMenus', component: ContextMenus, category: 'Components' },
	{ path: '/dropdowns', name: 'Dropdowns', component: Dropdowns, category: 'Components' },
	{ path: '/forms-elements', name: 'FormsElements', component: FormsElements, category: 'Components' },
	{ path: '/lang-selectors', name: 'LangSelectors', component: LangSelectors, category: 'Components' },
	{ path: '/loaders', name: 'Loaders', component: Loaders, category: 'Components' },
	{ path: '/logos', name: 'Logos', component: Logos, category: 'Components' },
	{ path: '/modals', name: 'Modals', component: Modals, category: 'Components' },
	{ path: '/placeholders', name: 'Placeholders', component: Placeholders, category: 'Components' },
	{ path: '/sliders', name: 'Sliders', component: Sliders, category: 'Components' },
	{ path: '/tables', name: 'Tables', component: Tables, category: 'Components' },
	{ path: '/tabs', name: 'Tabs', component: TabsTemplate, category: 'Components' },
	{ path: '/tooltips', name: 'Tooltips', component: Tooltips, category: 'Components' },

	// Utilitaires
	{ path: '/colors', name: 'Colors', component: Colors, category: 'Utilities' },
	{ path: '/dividers', name: 'Dividers', component: Dividers, category: 'Utilities' },
	{ path: '/grids', name: 'Grids', component: Grids, category: 'Utilities' },
	{ path: '/icons', name: 'Icons', component: Icons, category: 'Utilities' },
	{ path: '/radius', name: 'Radius', component: Radius, category: 'Utilities' },
	{ path: '/shadows', name: 'Shadows', component: Shadows, category: 'Utilities' },
	{ path: '/groups', name: 'Groups', component: Groups, category: 'Utilities' },

];

const App = () => {
	return (
		<BrowserRouter>
			<CookieConsent />
			{/* <MenuTemplate /> */}
			<div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
				<nav style={{ width: '250px', padding: '20px', borderRight: '1px solid var(--zuii-border, #eaeaea)' }}>
					<ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
						{['Sections', 'Components', 'Utilities'].map(category => (
							<li key={category}>
								<div style={{ fontWeight: 'bold', margin: '16px 0 8px', color: 'var(--zuii-text-muted, #666)', fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
									{category}
								</div>
								<ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
									{components.filter(c => c.category === category).map((c) => (
										<li key={c.path}>
											<NavLink
												to={c.path}
												style={({ isActive }) => ({
													display: 'block',
													padding: '6px 12px',
													textDecoration: 'none',
													color: isActive ? '#fff' : 'var(--zuii-text, #333)',
													backgroundColor: isActive ? 'var(--zuii-primary, #0d6efd)' : 'transparent',
													borderRadius: '4px',
													transition: 'all 0.2s'
												})}
											>
												{c.name}
											</NavLink>
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</nav>
				<main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
					<Routes>
						<Route path="/" element={<h2>Sélectionnez un composant dans le menu pour l'afficher</h2>} />
						{components.map((c) => (
							<Route key={c.path} path={c.path} element={<c.component />} />
						))}
					</Routes>
				</main>

			</div>
		</BrowserRouter>
	);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
