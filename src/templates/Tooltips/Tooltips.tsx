import { Group, Tooltip } from '../../index';
import { Button, Badge } from '../../index';

/**
 * Template de démonstration pour le composant Tooltip.
 */
export const Tooltips = () => {
	return (
		<div className="tooltip-demo">
			<section className="mb-5">
				<h3>Composant Tooltips</h3>
				<p className="text-muted mb-4">Le composant <code>Tooltip</code> permet d'afficher des tooltips sur des éléments.</p>

				<h5 className='mt-4'>Positions</h5>
				<p className="text-muted mb-4">Les tooltips peuvent être positionnés en haut, en bas, à gauche et à droite.</p>
				<Group>
					<Tooltip content="Tooltip en haut" placement="top">
						<Button variant="primary">Top</Button>
					</Tooltip>

					<Tooltip content="Tooltip à droite" placement="right">
						<Button variant="primary">Right</Button>
					</Tooltip>

					<Tooltip content="Tooltip en bas" placement="bottom">
						<Button variant="primary">Bottom</Button>
					</Tooltip>

					<Tooltip content="Tooltip à gauche" placement="left">
						<Button variant="primary">Left</Button>
					</Tooltip>

					<Tooltip content="Position automatique">
						<Button variant="primary">Auto</Button>
					</Tooltip>
				</Group>

				<h5 className='mt-4'>Délais d'affichage</h5>
				<p className="text-muted mb-4">Ajouter un délai d'affichage permet de contrôler quand le tooltip apparaît.</p>
				<Group>
					<Tooltip content="Apparaît immédiatement" delay={0}>
						<Button variant="success">Sans délai</Button>
					</Tooltip>

					<Tooltip content="Délai de 500ms" delay={{ show: 500, hide: 0 }}>
						<Button variant="success">Délai 500ms</Button>
					</Tooltip>

					<Tooltip content="Délai de 1000ms" delay={{ show: 1000, hide: 0 }}>
						<Button variant="success">Délai 1000ms</Button>
					</Tooltip>
				</Group>

				<h5 className='mt-4'>Contenu riche</h5>
				<p className="text-muted mb-4">Utiliser du HTML dans le tooltip permet de créer des contenus plus riches. Cela permet de personnaliser le contenu du tooltip. On peux aussi utliser la props <code>content</code> pour ajouter le contenu du tooltip.</p>
				<Group>
					<Tooltip
						content={
							<div>
								<strong>Titre du tooltip</strong>
								<p className="mb-0">Description détaillée</p>
							</div>
						}
					>
						<p className='text-secondary p-2'>HTML dans tooltip</p>
					</Tooltip>

					<Tooltip content="Texte très long pour tester le comportement du tooltip avec beaucoup de contenu. Cela permet de voir comment il s'adapte.">
						<p className='text-secondary p-2'>Texte long</p>
					</Tooltip>
				</Group>

				<h5 className='mt-4'>Classe personnalisée</h5>
				<p className="text-muted mb-4">On peux aussi utliser la props <code>className</code> pour ajouter une classe personnalisée au tooltip.</p>
				<Group>
					<Tooltip content="Tooltip personnalisé" className="custom-tooltip">
						<Badge variant="secondary">Classe custom</Badge>
					</Tooltip>
				</Group>
				<h5 className='mt-4'>Tooltip toujours affiché</h5>
				<p className="text-muted mb-4">On peux aussi utliser la props <code>show</code> pour afficher le tooltip permanentement.</p>
				<Group>
					<Tooltip content="Je suis toujours visible !" show placement="top">
						<Button variant="primary">Tooltip permanent</Button>
					</Tooltip>
				</Group>
			</section>

		</div>
	);
};
