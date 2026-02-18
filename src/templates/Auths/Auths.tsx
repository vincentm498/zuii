import { Auth } from '../../index';

/**
 * Template de démonstration pour le composant Auth.
 */
export const Auths = () => {
	return (
		<div className="Auths-demo">
			<section className="mb-5">
				<h3>Auths</h3>
				<p className="text-muted mb-4">Le composant <code>Auth</code> permet de ... .</p>
				<h5 className='mt-4'>Exemple</h5>
				<p className="text-muted mb-4">Voici un exemple de composant Auth.</p>
				<Auth />
			</section>
		</div>
	);
};
