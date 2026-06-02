import { Dashboard } from '../../index';

/**
 * Template de démonstration pour le composant Dashboard.
 */
export const Dashboards = () => {
	return (
		<div className="Dashboards-demo">
			<section className="mb-5">
				<h3>Dashboards</h3>
				<p className="text-muted mb-4">Le composant <code>Dashboard</code> permet de ... .</p>
				<h5 className='mt-4'>Exemple</h5>
				<p className="text-muted mb-4">Voici un exemple de composant Dashboard.</p>
				<Dashboard />
			</section>
		</div>
	);
};
