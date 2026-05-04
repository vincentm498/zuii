import { useState } from 'react';
import { Modal, Button, Group, Form } from '../../index';

/**
 * Template de démonstration pour le composant Modal.
 *
 * @returns {JSX.Element} Le rendu de la démo.
 */
export const Modals = () => {
	const [showBasic, setShowBasic] = useState(false);
	const [showLarge, setShowLarge] = useState(false);
	const [showCentered, setShowCentered] = useState(false);
	const [showScrollable, setShowScrollable] = useState(false);
	const [showForm, setShowForm] = useState(false);

	return (
		<div className="modals-demo">
			<section className="mb-5">
				<h3>Composant Modal</h3>
				<p className="text-muted mb-4">
					Le composant <code>Modal</code> est un wrapper autour de React Bootstrap Modal, stylisé pour s'intégrer à zuii.
				</p>

				<Group gap="md">
					<Button onClick={() => setShowBasic(true)}>
						Modale Basique
					</Button>

					<Button variant="secondary" onClick={() => setShowLarge(true)}>
						Grande Modale (lg)
					</Button>

					<Button variant="outline-primary" onClick={() => setShowCentered(true)}>
						Modale Centrée
					</Button>

					<Button variant="outline-primary" onClick={() => setShowScrollable(true)}>
						Modale Scrollable
					</Button>

					<Button variant="outline-primary" onClick={() => setShowForm(true)}>
						Modale avec formulaire
					</Button>
				</Group>

				{/* Modale Basique */}
				<Modal
					show={showBasic}
					onHide={() => setShowBasic(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Titre de la modale</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Ceci est une modale standard. Elle apparaît en haut de la page par défaut.</p>
						<p>Le contenu est flexible et supporte n'importe quel élément React.</p>
					</Modal.Body>
					<Modal.Footer>
						<Group gap="sm">
							<Button variant="secondary" onClick={() => setShowBasic(false)}>
								Annuler
							</Button>
							<Button onClick={() => setShowBasic(false)}>
								Confirmer
							</Button>
						</Group>
					</Modal.Footer>
				</Modal>

				{/* Grande Modale */}
				<Modal
					show={showLarge}
					onHide={() => setShowLarge(false)}
					size="lg"
				>
					<Modal.Header closeButton>
						<Modal.Title>Grande Modale</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h5>Plus d'espace pour le contenu</h5>
						<p>Utilisez la propriété <code>size="lg"</code> pour des contenus plus complexes ou des formulaires.</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => setShowLarge(false)}>Fermer</Button>
					</Modal.Footer>
				</Modal>

				{/* Modale Centrée */}
				<Modal
					show={showCentered}
					onHide={() => setShowCentered(false)}
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title>Modale Centrée Verticalement</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Cette modale est centrée verticalement dans le viewport grâce à la propriété <code>centered</code>.</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => setShowCentered(false)}>Parfait</Button>
					</Modal.Footer>
				</Modal>

				{/* Modale Scrollable */}
				<Modal
					show={showScrollable}
					onHide={() => setShowScrollable(false)}
					scrollable
				>
					<Modal.Header closeButton>
						<Modal.Title>Modale avec défilement</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Cette modale permet de faire défiler le contenu à l'intérieur du corps de la modale (<code>BSTModal.Body</code>) au lieu de faire défiler la page entière.</p>
						{Array.from({ length: 15 }).map((_, i) => (
							<p key={i}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue vehicula euismod. Aliquam tincidunt mauris eu risus.
							</p>
						))}
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => setShowScrollable(false)}>Fermer</Button>
					</Modal.Footer>
				</Modal>

				{/* Modale avec formulaire */}
				<Modal
					show={showForm}
					onHide={() => setShowForm(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Modale avec formulaire</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							<div className="mb-3">
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control type="email" placeholder="Enter email" />
									<Form.Text className="text-muted">
										We'll never share your email with anyone else.
									</Form.Text>
								</Form.Group>
							</div>
							<div className="mb-3">
								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" placeholder="Password" />
								</Form.Group>
							</div>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => setShowForm(false)}>Fermer</Button>
					</Modal.Footer>
				</Modal>
			</section>
		</div>
	);
};
