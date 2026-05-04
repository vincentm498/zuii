export const es = {
	consentModal: {
		title: 'Utilizamos cookies',
		description: 'Utilizamos cookies para mejorar su experiencia en nuestro sitio.',
		acceptAllBtn: 'Aceptar todo',
		acceptNecessaryBtn: 'Rechazar todo',
		showPreferencesBtn: 'Administrar preferencias',
		footer: `
			<a href="politica-privacidad">Política de privacidad</a>
			<a href="aviso-legal">Aviso legal</a>
		`
	},
	preferencesModal: {
		title: 'Centro de preferencias',
		savePreferencesBtn: 'Guardar preferencias',
		acceptAllBtn: 'Aceptar todo',
		acceptNecessaryBtn: 'Rechazar todo',
		closeIconLabel: 'Cerrar',
		sections: [
			{
				title: 'Cookies estrictamente necesarias',
				description: 'Estas cookies son esenciales para el correcto funcionamiento del sitio y no pueden desactivarse (p. ej., seguridad, sesión).',
				linkedCategory: 'necessary'
			},
			{
				title: 'Cookies de rendimiento y análisis',
				description: 'Estas cookies nos permiten contar las visitas y las fuentes de tráfico para que podamos medir y mejorar el rendimiento de nuestro sitio.',
				linkedCategory: 'analytics'
			},
			{
				title: 'Cookies de funcionalidad',
				description: 'Estas cookies permiten que el sitio recuerde las opciones que usted realiza (como su nombre de usuario, idioma o la región en la que se encuentra).',
				linkedCategory: 'functionality'
			},
			{
				title: 'Cookies de publicidad y marketing',
				description: 'Estas cookies se utilizan para ofrecer anuncios más relevantes para usted y sus intereses.',
				linkedCategory: 'marketing'
			},
			{
				title: 'Más información',
				description: 'Para cualquier pregunta relacionada con nuestra Política de privacidad y sus opciones, por favor <a href="contacto">contáctenos</a>.'
			}
		]
	}
};
