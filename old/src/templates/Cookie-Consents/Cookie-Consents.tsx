import { CookieConsent } from '../../index';

/**
 * Template de démonstration pour le composant CookieConsent.
 */
export const CookieConsents = () => {
	return (
		<div className="CookieConsents-demo">
			<section className="mb-5">
				<h3>CookieConsents</h3>
				<p className="text-muted mb-4">Le composant <code>CookieConsent</code> permet de ... .</p>
				<h5 className='mt-4'>Exemple</h5>
				<p className="text-muted mb-4">Voici un exemple de composant CookieConsent.</p>
				<CookieConsent />
			</section>
		</div>
	);
};
