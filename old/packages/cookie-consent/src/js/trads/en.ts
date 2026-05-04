export const en = {
	consentModal: {
		title: 'We use cookies',
		description: 'We use cookies to improve your experience on our site.',
		acceptAllBtn: 'Accept all',
		acceptNecessaryBtn: 'Reject all',
		showPreferencesBtn: 'Manage preferences',
		footer: `
			<a href="privacy-policy">Privacy Policy</a>
			<a href="legal-mentions">Legal Mentions</a>
		`
	},
	preferencesModal: {
		title: 'Preference Center',
		savePreferencesBtn: 'Save preferences',
		acceptAllBtn: 'Accept all',
		acceptNecessaryBtn: 'Reject all',
		closeIconLabel: 'Close',
		sections: [
			{
				title: 'Strictly necessary cookies',
				description: 'These cookies are essential for the proper functioning of the site and cannot be disabled (e.g. security, session).',
				linkedCategory: 'necessary'
			},
			{
				title: 'Performance and analytics cookies',
				description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.',
				linkedCategory: 'analytics'
			},
			{
				title: 'Functionality cookies',
				description: 'These cookies allow the site to remember choices you make (such as your user name, language or the region you are in).',
				linkedCategory: 'functionality'
			},
			{
				title: 'Advertising and marketing cookies',
				description: 'These cookies are used to deliver adverts more relevant to you and your interests.',
				linkedCategory: 'marketing'
			},

			{
				title: 'More information',
				description: 'For any questions regarding our Privacy Policy and your choices, please <a href="contact">contact us</a>.'
			}
		]
	}
};
