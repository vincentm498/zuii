import { Errorpage } from '../../index';

/**
 * Template de démonstration pour le composant Errorpage.
 */
export const Errorpages = () => {
	return (
		<div className="Errorpages-demo">
			<section className="mb-5">
				<h3>Errorpages</h3>
				<p className="text-muted mb-4">Le composant <code>Errorpage</code> permet de ... .</p>
				<h5 className='mt-4'>Exemple</h5>
				<p className="text-muted mb-4">Voici un exemple de composant Errorpage.</p>
				<Errorpage />
			</section>
		</div>
	);
};
