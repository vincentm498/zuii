export const de = {
	consentModal: {
		title: 'Wir verwenden Cookies',
		description: 'Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern.',
		acceptAllBtn: 'Alle akzeptieren',
		acceptNecessaryBtn: 'Alle ablehnen',
		showPreferencesBtn: 'Präferenzen verwalten',
		footer: `
			<a href="datenschutzerklaerung">Datenschutzerklärung</a>
			<a href="impressum">Impressum</a>
		`
	},
	preferencesModal: {
		title: 'Präferenzzentrum',
		savePreferencesBtn: 'Einstellungen speichern',
		acceptAllBtn: 'Alle akzeptieren',
		acceptNecessaryBtn: 'Alle ablehnen',
		closeIconLabel: 'Schließen',
		sections: [
			{
				title: 'Unbedingt erforderliche Cookies',
				description: 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich und können nicht deaktiviert werden (z. B. Sicherheit, Sitzung).',
				linkedCategory: 'necessary'
			},
			{
				title: 'Leistungs- und Analyse-Cookies',
				description: 'Diese Cookies ermöglichen es uns, Besuche und Verkehrsquellen zu zählen, damit wir die Leistung unserer Website messen und verbessern können.',
				linkedCategory: 'analytics'
			},
			{
				title: 'Funktionelle Cookies',
				description: 'Diese Cookies ermöglichen es der Website, sich an von Ihnen getroffene Entscheidungen zu erinnern (wie z. B. Ihren Benutzernamen, Ihre Sprache oder die Region, in der Sie sich befinden).',
				linkedCategory: 'functionality'
			},
			{
				title: 'Werbe- und Marketing-Cookies',
				description: 'Diese Cookies werden verwendet, um Anzeigen zu schalten, die für Sie und Ihre Interessen relevanter sind.',
				linkedCategory: 'marketing'
			},
			{
				title: 'Weitere Informationen',
				description: 'Bei Fragen zu unserer Datenschutzrichtlinie und Ihren Entscheidungen <a href="kontakt">kontaktieren Sie uns bitte</a>.'
			}
		]
	}
};
