import { Nav } from '../../index';

/**
 * Template de démonstration pour le composant Nav.
 */
export const Navs = () => {
	return (
		<div className="Navs-demo">
			<section className="mb-5">
				<h3>Navs</h3>
				<p className="text-muted mb-4">Le composant <code>Nav</code> permet de ... .</p>
				<h5 className='mt-4'>Exemple</h5>
				<p className="text-muted mb-4">Voici un exemple de composant Nav.</p>
				<Nav />
			</section>
		</div>
	);
};
