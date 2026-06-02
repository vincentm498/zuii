export const fr = {
	consentModal: {
		title: 'Nous utilisons des cookies',
		description: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site.',
		acceptAllBtn: 'Tout accepter',
		acceptNecessaryBtn: 'Tout refuser',
		showPreferencesBtn: 'Gérer les préférences',
		footer: `
			<a href="politique-confidentialite">Politique de confidentialité</a>
			<a href="mentions-legales">Mentions légales</a>
		`
	},
	preferencesModal: {
		title: 'Centre de préférences',
		savePreferencesBtn: 'Enregistrer',
		acceptAllBtn: 'Tout accepter',
		acceptNecessaryBtn: 'Tout refuser',
		closeIconLabel: 'Fermer',
		sections: [
			{
				title: 'Cookies strictement nécessaires',
				description: 'Ces cookies sont indispensables au bon fonctionnement du site et ne peuvent pas être désactivés (ex: sécurité, session).',
				linkedCategory: 'necessary'
			},
			{
				title: 'Cookies de performance et d’analyse',
				description: 'Ces cookies nous permettent de compter les visites et les sources de trafic afin que nous puissions mesurer et améliorer les performances de notre site.',
				linkedCategory: 'analytics'
			},
			{
				title: 'Cookies de fonctionnalité',
				description: 'Ces cookies permettent au site de se souvenir de vos choix (comme votre nom d\'utilisateur, votre langue ou la région où vous vous trouvez).',
				linkedCategory: 'functionality'
			},
			{
				title: 'Cookies publicitaires et de marketing',
				description: 'Ces cookies sont utilisés pour diffuser des publicités plus pertinentes pour vous et vos centres d\'intérêt.',
				linkedCategory: 'marketing'
			},

			{
				title: 'Plus d’informations',
				description: 'Pour toute question relative à notre Politique de confidentialité et à vos choix, veuillez <a href="contact">nous contacter</a>.'
			}
		]
	}
};
