import { ReactNode } from 'react';
import { Grid, GridItem, GridSpacer } from '../../index';

/**
 * Sous-composant pour l'affichage des cellules de démonstration.
 */
const DemoItem = ({ children, label, color = 'var(--primary-light)' }: { children: ReactNode, label?: ReactNode, color?: string }) => (
	<div style={{
		backgroundColor: color,
		padding: '1rem',
		boxSizing: 'border-box',
		width: '100%',
		minHeight: '4rem',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	}}>
		{children}
		{label && <small className="text-muted" style={{ marginTop: '0.25rem' }}>{label}</small>}
	</div>
);

/**
 * Template de démonstration pour le composant Grid.
 *
 * @returns {JSX.Element} Le rendu du template.
 */
export const Grids = () => {
	return (
		<div className="Grids-demo">
			<section className="mb-5">
				<header className="mb-4">
					<h3>Grids</h3>
					<p className="text-muted">
						Le composant <code>Grid</code> utilise <code>display: grid</code> avec 24 colonnes par défaut.
						Utilisez <code>GridItem</code> pour gérer les colonnes occupées et la réactivité basée sur les <b>Container Queries</b>.
					</p>
				</header>

				<article className="mb-5">
					<h5 className="mb-3">Exemple 1 : Spans Responsives</h5>
					<p className="text-muted small mb-4">
						Redimensionnez la fenêtre pour voir le comportement :<br/>
						- Item 1 : 24 cols {"->"} 12 cols (sm) {"->"} 8 cols (md) {"->"} 6 cols (lg)<br/>
						- Item 2 : 24 cols {"->"} 12 cols (sm) {"->"} 16 cols (md) {"->"} 18 cols (lg)
					</p>

					<Grid className="mb-4">
						<GridItem sm={12} md={8} lg={6}>
							<DemoItem label="sm={12} md={8} lg={6}">Item 1</DemoItem>
						</GridItem>
						<GridItem sm={12} md={16} lg={18}>
							<DemoItem label="sm={12} md={16} lg={18}">Item 2</DemoItem>
						</GridItem>
					</Grid>
				</article>

				<article className="mb-5">
					<h5 className="mb-3">Exemple 2 : Tailles Fixes & Colonnes Égales</h5>
					<Grid className="mb-4">
						<GridItem span={12}>
							<DemoItem>12 / 24</DemoItem>
						</GridItem>
						<GridItem span={12}>
							<DemoItem>12 / 24</DemoItem>
						</GridItem>
					</Grid>

					<Grid gap={4}>
						{[1, 2, 3, 4].map(i => (
							<GridItem key={i} span={6}>
								<DemoItem>6 / 24</DemoItem>
							</GridItem>
						))}
					</Grid>
				</article>

				<article className="mb-5">
					<h5 className="mb-3">🔥 Démo : Container Queries</h5>
					<p className="text-muted small mb-4">
						Chaque grille ci-dessous utilise le <b>même code</b> mais s'adapte à la largeur de son <b>propre conteneur parent</b>.
					</p>

					<div className="d-flex flex-column gap-5">
						<div>
							<h6 className="small font-weight-bold">1. Conteneur plein (100%)</h6>
							<Grid style={{ border: '1px dashed #ccc', padding: '1rem' }}>
								{[1, 2, 3, 4].map(i => (
									<GridItem key={i} md={12} lg={6}>
										<DemoItem>Item {i}</DemoItem>
									</GridItem>
								))}
							</Grid>
						</div>

						<div style={{ maxWidth: '600px' }}>
							<h6 className="small font-weight-bold">2. Conteneur restreint (600px)</h6>
							<Grid style={{ border: '1px dashed #ccc', padding: '1rem' }}>
								{[1, 2, 3, 4].map(i => (
									<GridItem key={i} md={12} lg={6}>
										<DemoItem>Item {i}</DemoItem>
									</GridItem>
								))}
							</Grid>
						</div>

						<div style={{ maxWidth: '300px' }}>
							<h6 className="small font-weight-bold">3. Conteneur très étroit (300px)</h6>
							<Grid gap={2} style={{ border: '1px dashed #ccc', padding: '1rem' }}>
								{[1, 2, 3, 4].map(i => (
									<GridItem key={i} md={12} lg={6}>
										<DemoItem>Item {i}</DemoItem>
									</GridItem>
								))}
							</Grid>
						</div>
					</div>
				</article>

				<article className="mb-5">
					<h5 className="mb-3">⛓️ Démo : Gaps Responsives</h5>
					<p className="text-muted small mb-4">
						Les espacements (gaps) s'adaptent aussi au conteneur (Défaut: 1, sm: 4, md: 8, lg: 12).
					</p>
					<Grid gap={1} smGap={4} mdGap={8} lgGap={12} style={{ border: '1px solid #eee', padding: '1rem' }}>
						{[1, 2, 3, 4, 5, 6].map(i => (
							<GridItem key={i} span={8} md={4}>
								<DemoItem color="var(--secondary-light)">Gap Test</DemoItem>
							</GridItem>
						))}
					</Grid>
				</article>

				<article className="mb-5">
					<h5 className="mb-3">↔️ Démo : Gaps X et Y séparés</h5>
					<Grid gapY={2} mdGapX={2}>
						{[1, 2, 3, 4, 5, 6].map(i => (
							<GridItem key={i} md={12} lg={6}>
								<DemoItem color="var(--success-light)">X: 12 / Y: 2</DemoItem>
							</GridItem>
						))}
					</Grid>
				</article>

				<article className="mb-5">
					<h5 className="mb-3">🌌 Démo : Spacer & Masquage (span=0)</h5>
					<p className="text-muted small mb-4">
						Le composant <code>GridSpacer</code> permet de créer des espaces vides.
						Utilisez <code>span={'{0}'}</code> pour masquer un élément sur certains breakpoints.
					</p>

					<h6>Spacer réactif</h6>
					<Grid className="mb-4">
						<GridItem md={6}>
							<DemoItem color="var(--accent-light)">Bloc Gauche</DemoItem>
						</GridItem>
						{/* Espace de 12 colonnes, caché sur sm (0) */}
						<GridSpacer md={12} sm={0} />
						<GridItem md={6}>
							<DemoItem color="var(--accent-light)">Bloc Droite</DemoItem>
						</GridItem>
					</Grid>

					<h6>Masquage sélectif</h6>
					<Grid>
						<GridItem span={12} md={24}>
							<DemoItem>Visible partout</DemoItem>
						</GridItem>
						<GridItem span={0} md={12}>
							<DemoItem color="var(--warning-light)">Caché sur mobile, visible sur MD</DemoItem>
						</GridItem>
						<GridItem span={12} md={0}>
							<DemoItem color="var(--danger-light)">Visible sur mobile, caché sur MD</DemoItem>
						</GridItem>
					</Grid>
				</article>
			</section>
		</div>
	);
};




