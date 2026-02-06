import { Placeholder, Group } from '../../index';

/**
 * Template de démonstration pour le composant Placeholder.
 *
 * @returns {JSX.Element} Le rendu de la démo.
 */
export const Placeholders = () => {
	return (
		<div className="placeholders-demo">
			<section className="mb-5">
				<h3>Composant Placeholder</h3>
				<p className="text-muted mb-4">
					Le composant <code>Placeholder</code> permet d'afficher des squelettes de chargement (skeleton screens).
				</p>

				<h5 className="mt-4">Animations</h5>
				<p className="text-muted small">Effets visuels pour indiquer un chargement actif.</p>
				<Group vertical gap="xs">
					<Placeholder animation="glow" />
					<Placeholder animation="wave" />
				</Group>

				<h5 className="mt-4">Tailles</h5>
				<Group vertical gap="xs">
					<Placeholder size="xs" />
					<Placeholder size="sm" />
					<Placeholder />
					<Placeholder size="lg" />
				</Group>

				<h5 className="mt-4">Variantes de couleurs</h5>
				<Group gap="md">
					<Placeholder variant="primary" />
					<Placeholder variant="secondary" />
					<Placeholder variant="success" />
					<Placeholder variant="danger" />
					<Placeholder variant="warning" />
					<Placeholder variant="info" />
				</Group>

				<h5 className="mt-4">Images</h5>
				<p className="text-muted small">Pour simuler des avatars ou des blocs d'images.</p>
				<Group gap="md">
					<Placeholder image animation="glow" />
					<Placeholder image animation="wave" style={{ borderRadius: '50%' }} />
					<Placeholder image style={{ width: '200px', height: '120px' }} />
				</Group>

				<h5 className="mt-4">Boutons</h5>
				<p className="text-muted small">Pour simuler des boutons.</p>
				<Group gap="md">
					<Placeholder button animation="glow" />
					<Placeholder button animation="glow" variant="secondary" />
					<Placeholder button animation="wave" variant="success" />
					<Placeholder button variant="danger" />
				</Group>
			</section>
		</div>
	);
};
