import { Card, Button } from '../../index';

/**
 * Template de démonstration pour le composant Card.
 */
export const Cards = () => {
	return (
		<div className="Cards-demo">
			<section className="mb-5">
				<h3>Cards</h3>
				<p className="text-muted mb-4">Le composant <code>Card</code> est basé sur React Bootstrap tout en utilisant les classes BEM de zuii.</p>

				<h5 className='mt-4'>Basique</h5>
				<p className="text-muted mb-4">Un exemple de carte simple avec un titre, du texte et un bouton.</p>
				<Card>
					<Card.Img variant="top" src="https://placehold.co/286x180" alt="Placeholder d'image" />
					<Card.Body>
						<Card.Title>Titre de la carte</Card.Title>
						<Card.Text>
							Un exemple rapide de texte pour construire le titre de la carte et constituer la majeure partie du contenu.
						</Card.Text>
						<Button variant="primary">Go somewhere</Button>
					</Card.Body>
				</Card>

				<h5 className='mt-5'>En-tête et Pied de page</h5>
				<p className="text-muted mb-4">Cartes contenant un `Card.Header` et un `Card.Footer`.</p>
				<Card>
					<Card.Header>Featured</Card.Header>
					<Card.Body>
						<Card.Title>Titre spécial</Card.Title>
						<Card.Text>
							Avec du texte supplémentaire à l'intérieur pour montrer l'utilisation du header.
						</Card.Text>
						<Button variant="primary">Action</Button>
					</Card.Body>
					<Card.Footer className="text-muted">Il y a 2 jours</Card.Footer>
				</Card>

				<h5 className='mt-5'>Superposition d'image</h5>
				<p className="text-muted mb-4">Transformer une image en arrière-plan d'une carte et écrire par-dessus.</p>
				<Card className="bg-dark text-white">
					<Card.Img src="https://placehold.co/800x200/333/fff" alt="Card image" />
					<Card.ImgOverlay>
						<Card.Title>Superposition</Card.Title>
						<Card.Text>
							Ceci est une carte plus large avec un texte de support en dessous comme introduction naturelle à un contenu supplémentaire. Ce contenu est un peu plus long.
						</Card.Text>
						<Card.Text>Dernière mise à jour : 3 minutes.</Card.Text>
					</Card.ImgOverlay>
				</Card>
			</section>
		</div>
	);
};
