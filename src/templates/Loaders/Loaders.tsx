import { Loader, Group } from '../../index';

/**
 * Composant de démonstration pour les Loaders.
 *
 * @returns {JSX.Element} La page de démo des loaders.
 */
export const Loaders = () => {
	return (
		<div className="flex flex-col gap-8">
			<section>
				<h2 className="mb-4 text-xl font-bold">Variantes</h2>
				<Group center gap="xl" className="py-4">
					<div className="flex flex-col items-center gap-3" style={{ minWidth: '100px' }}>
						<Loader variant="dots" />
						<span className="text-xs text-muted mt-2">Dots</span>
					</div>
					<div className="flex flex-col items-center gap-3" style={{ minWidth: '100px' }}>
						<Loader variant="spinner" />
						<span className="text-xs text-muted mt-2">Spinner</span>
					</div>
					<div className="flex flex-col items-center gap-3" style={{ minWidth: '100px' }}>
						<Loader variant="pulse" />
						<span className="text-xs text-muted mt-2">Pulse</span>
					</div>
					<div className="flex flex-col items-center gap-3" style={{ minWidth: '100px' }}>
						<Loader variant="quad" />
						<span className="text-xs text-muted mt-2">Quad</span>
					</div>
				</Group>
			</section>

			<section>
				<h2 className="mb-4 text-xl font-bold">Tailles</h2>
				<Group center gap="xl" className="py-4">
					<div className="flex flex-col items-center gap-3" style={{ minWidth: '80px' }}>
						<Loader size="sm" />
						<span className="text-xs text-muted">Small</span>
					</div>
					<div className="flex flex-col items-center gap-3" style={{ minWidth: '80px' }}>
						<Loader size="md" />
						<span className="text-xs text-muted">Medium</span>
					</div>
					<div className="flex flex-col items-center gap-3" style={{ minWidth: '80px' }}>
						<Loader size="lg" />
						<span className="text-xs text-muted">Large</span>
					</div>
				</Group>
			</section>



			<section>
				<h2 className="mb-4 text-xl font-bold">Avec Message</h2>
				<Group center vertical gap="lg">
					<Loader size="md" message="Chargement des données en cours..." />
					<Loader size="lg">
						<div className="text-center">
							<p className="font-bold text-primary">Veuillez patienter</p>
							<p className="text-sm">Traitement en cours</p>
						</div>
					</Loader>
				</Group>
			</section>

			<section>
				<h2 className="mb-4 text-xl font-bold">Variantes de couleurs</h2>
				<Group center gap="xl">
					<Loader color="success" variant="dots" />
					<Loader color="danger" variant="spinner" />
					<Loader color="warning" variant="pulse" />
					<Loader color="info" variant="quad" />
				</Group>
			</section>

		</div>
	);
};
