import { useState, Fragment } from 'react';
import { Alert, Button, Group, Divider } from '../../index';
import type { AlertVariant } from '../../components/Alert/react';
import type { SweetAlertResult } from 'sweetalert2';

/**
 * Template de démonstration pour le composant Alert.
 */
export const Alerts = () => {
	const [showDismissible, setShowDismissible] = useState(true);
	const [showControlled, setShowControlled] = useState(true);

	/**
	 * Affiche une alerte SweetAlert2 de base.
	 */
	const showBasicAlert = (type: 'default' | 'success' | 'error' | 'warning' | 'info' | 'question') => {
		const titles = {
			default: 'Alerte',
			success: 'Succès !',
			error: 'Erreur !',
			warning: 'Attention !',
			info: 'Information',
			question: 'Question ?'
		};

		const texts = {
			default: 'Une alerte est une notification qui permet de signaler des informations importantes.',
			success: 'Votre opération a été effectuée avec succès.',
			error: 'Une erreur est survenue lors de l\'opération.',
			warning: 'Veuillez vérifier les informations saisies.',
			info: 'Voici une information importante.',
			question: 'Êtes-vous sûr de vouloir continuer ?'
		};

		const icons = {
			default: 'icon-info',
			success: 'icon-check',
			error: 'icon-x',
			warning: 'icon-shield-alert',
			info: 'icon-life-buoy',
			question: 'icon-message-circle-question-mark'
		};

		const variants: Record<string, AlertVariant> = {
			default: undefined,
			success: 'success',
			error: 'danger',
			warning: 'warning',
			info: 'info',
			question: 'secondary'
		};

		Alert.fire({
			icon: icons[type],
			variant: variants[type],
			title: titles[type],
			showConfirmButton: false,
			html: (
				<div>
					{texts[type]}
				</div>
			),
		});
	};

	/**
	 * Affiche une alerte de confirmation.
	 */
	const showConfirmAlert = () => {
		Alert.fire({
			title: 'Êtes-vous sûr ?',
			text: "Cette action est irréversible !",
			icon: 'warning',
			confirmButtonText: 'Oui, supprimer !',
			cancelButtonText: 'Annuler',
			dismissible: true,
			iconHtml: '<i class="icon icon-house"></i>',
		}).then((result: SweetAlertResult) => {
			if (result.isConfirmed) {
				Alert.fire({
					title: 'Supprimé !',
					text: 'L\'élément a été supprimé.',
					icon: 'icon-trash',
				});
			}
		});
	};

	/**
	 * Affiche une alerte avec input.
	 */
	const showInputAlert = async () => {
		const result = await Alert.fire({
			title: 'Entrez votre email',
			input: 'email',
			inputLabel: 'Votre adresse email',
			inputPlaceholder: 'exemple@email.com',
			cancelButtonText: 'Annuler',
			confirmButtonText: 'Valider',
			inputValidator: (value: string) => {
				if (!value) {
					return 'Vous devez entrer une adresse email !';
				}
			}
		});

		if (result.isConfirmed) {
			Alert.fire({
				title: 'Email enregistré !',
				icon: 'icon-check',
				showConfirmButton: false,
				html: (
					<Group vertical>
						<p>Votre email : <strong>{result.value}</strong></p>
						<Button
							variant="secondary"
							onClick={() => Alert.close()}
						>
							Fermer
						</Button>
					</Group>
				),
			});
		}
	};

	/**
	 * Affiche une alerte avec timer.
	 */
	const showTimerAlert = () => {
		Alert.fire({
			title: 'Fermeture automatique',
			html: (
				<Group vertical>
					<p>Cette alerte se fermera automatiquement dans 3 secondes.</p>
					<Button
						variant="danger"
						icon="icon-x"
						onClick={() => Alert.fire({ title: 'Action annulée', icon: 'info' })}
					>
						Annuler
					</Button>
				</Group>
			),
			timer: 300000,
			variant: 'danger',
			timerProgressBar: true,
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			dismissible: true,
		});
	};

	/**
	 * Affiche une alerte avec une icône de la bibliothèque.
	 */
	const showIconAlert = () => {
		Alert.fire({
			title: 'Action réussie !',
			text: 'L\'élément a été déplacé dans la corbeille.',
			icon: 'icon-trash',
			confirmButtonText: 'Fermer',

		});
	};

	/**
	 * Affiche une alerte personnalisée.
	 */
	const showCustomAlert = () => {
		Alert.fire({
			title: 'Alerte personnalisée',
			text: 'Avec des animations personnalisées !',
			icon: 'info',
			confirmButtonText: 'Super !',
			showClass: {
				popup: 'animate__animated animate__fadeInDown'
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutUp'
			},
		});
	};

	/**
	 * Affiche une alerte avec un composant React injecté.
	 */
	const showReactComponentAlert = () => {
		Alert.fire({
			title: <strong>Utilisation de composants React</strong>,
			dismissible: true,
			customClass: { popup: 'p-5' },
			html: (
				<div className="text-center">
					<p>Vous pouvez injecter vos propres composants directement !</p>
					<Divider className="my-3" />
					<Group gap="sm" align="center">
						<Button
							variant="success"
							icon="icon-check"
							onClick={() => Alert.fire({
								title: 'Bravo !',
								icon: 'icon-check',
								showConfirmButton: false,
								html: (
									<div className="text-center">
										<p>Vous avez cliqué sur le bouton React !</p>
										<Button
											variant="secondary"
											icon="icon-x"
											onClick={() => Alert.fire({ title: 'Action annulée', icon: 'icon-x', showConfirmButton: false })}
										>
											Annuler
										</Button>
									</div>
								),
							})}
						>
							Bouton React
						</Button>
						<Button
							variant="secondary"
							icon="icon-x"
							onClick={() => Alert.fire({ title: 'Action annulée', icon: 'info' })}
						>
							Annuler
						</Button>
					</Group>
				</div>
			),
			showConfirmButton: false,
		});
	};

	return (
		<div className="Alerts-demo">
			<section className="mb-5">
				<h3>Composant Alert</h3>
				<p className="text-muted mb-4">
					Le composant <code>Alert</code> permet d'afficher des messages de feedback contextuels pour les actions utilisateur typiques.
				</p>

				<h5 className='mt-4'>Variantes de couleur</h5>
				<p className="text-muted small mb-4">
					Les alertes sont disponibles en 8 variantes de couleur différentes.
				</p>
				{['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].map((variant) => (
					<Fragment key={variant}>
						<Alert variant={variant as any}>
							Ceci est une alerte <strong>{variant}</strong> — jetez-y un œil !
						</Alert>
						<div className="mb-2"></div>
					</Fragment>
				))}

				<h5 className='mt-4'>Avec liens</h5>
				<p className="text-muted small mb-4">
					Utilisez le composant <code>Alert.Link</code> pour afficher des liens stylisés dans l'alerte.
				</p>
				{['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].map((variant) => (
					<Fragment key={variant}>
						<Alert variant={variant as any}>
							Ceci est une alerte {variant} avec{' '}
							<Alert.Link href="#">un exemple de lien</Alert.Link>. Cliquez dessus si vous le souhaitez.
						</Alert>
						<div className="mb-2"></div>
					</Fragment>
				))}

				<h5 className='mt-4'>Contenu additionnel</h5>
				<p className="text-muted small mb-4">
					Les alertes peuvent contenir n'importe quel contenu : titres, paragraphes, séparateurs, etc.
				</p>
				<Alert variant="success">
					<Alert.Heading>Hé, ravi de vous voir !</Alert.Heading>
					<p>
						Génial, vous avez lu ce message important avec succès. Ce texte d'exemple va être un peu plus long
						pour que vous puissiez voir comment l'espacement fonctionne dans une alerte avec ce type de contenu.
					</p>
					<p className="mb-0">
						N'oubliez pas d'utiliser les utilitaires de marge pour garder les choses propres et ordonnées.
					</p>
				</Alert>

				<h5 className='mt-4'>Alerte dismissible</h5>
				<p className="text-muted small mb-4">
					Ajoutez la prop <code>dismissible</code> pour ajouter un bouton de fermeture fonctionnel.
				</p>
				{showDismissible ? (
					<Alert
						variant="danger"
						dismissible
						onClose={() => setShowDismissible(false)}
					>
						<Alert.Heading>Oh non ! Vous avez une erreur !</Alert.Heading>
						<p>
							Changez ceci et cela et réessayez. Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
							eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.
						</p>
					</Alert>
				) : (
					<Button onClick={() => setShowDismissible(true)}>Afficher l'alerte</Button>
				)}

				<h5 className='mt-4'>Contrôle de visibilité</h5>
				<p className="text-muted small mb-4">
					Vous pouvez également contrôler l'état visuel directement avec la prop <code>show</code>.
				</p>
				<Alert show={showControlled} variant="success">
					<Alert.Heading>Mon alerte</Alert.Heading>
					<p>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
						Cras mattis consectetur purus sit amet fermentum.
					</p>
					<div className="d-flex justify-content-end">
						<Button onClick={() => setShowControlled(false)} variant="outline" color="success">
							Fermer
						</Button>
					</div>
				</Alert>
				{!showControlled && (
					<Button onClick={() => setShowControlled(true)}>Afficher l'alerte</Button>
				)}
			</section>

			<section className="mb-5">
				<h3>SweetAlert2 - Alertes harmonisées</h3>
				<p className="text-muted mb-4">
					<code>SweetAlert2</code> est ici encapsulé pour utiliser les styles du composant <code>Alert</code> (couleurs, bordures, titres).
					Les variantes sont automatiquement mappées en fonction de l'icône choisie.
				</p>

				<h5 className='mt-4'>Alertes de base</h5>
				<p className="text-muted small mb-4">
					Les 5 types d'alertes disponibles avec SweetAlert2.
				</p>
				<Group gap="sm" className="mb-3">
					<Button onClick={() => showBasicAlert('default')}>
						Default
					</Button>
					<Button onClick={() => showBasicAlert('success')}>
						Succès
					</Button>
					<Button onClick={() => showBasicAlert('error')}>
						Erreur
					</Button>
					<Button onClick={() => showBasicAlert('warning')}>
						Attention
					</Button>
					<Button onClick={() => showBasicAlert('info')}>
						Info
					</Button>
					<Button onClick={() => showBasicAlert('question')}>
						Question
					</Button>
				</Group>

				<h5 className='mt-4'>Alerte de confirmation</h5>
				<p className="text-muted small mb-4">
					Dialogue avec boutons de confirmation et d'annulation.
				</p>
				<Button onClick={showConfirmAlert}>
					Supprimer l'élément
				</Button>

				<h5 className='mt-4'>Alerte avec input</h5>
				<p className="text-muted small mb-4">
					Formulaire de saisie intégré dans l'alerte.
				</p>
				<Button onClick={showInputAlert}>
					Entrer un email
				</Button>

				<h5 className='mt-4'>Alerte avec timer</h5>
				<p className="text-muted small mb-4">
					Fermeture automatique après un délai avec barre de progression.
				</p>
				<Button onClick={showTimerAlert}>
					Alerte avec timer
				</Button>

				<h5 className='mt-4'>Alertes personnalisées</h5>
				<p className="text-muted small mb-4">
					Styles et animations personnalisés.
				</p>
				<Group gap="sm">
					<Button onClick={showIconAlert}>
						Icône personnalisée
					</Button>
					<Button onClick={showCustomAlert}>
						Animation personnalisée
					</Button>
					<Button variant="info" onClick={showReactComponentAlert}>
						Composant React injecté
					</Button>
				</Group>
			</section>
		</div>
	);
};
