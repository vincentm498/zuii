import { useNavigate } from "react-router-dom";
import { Group, Icon, Button } from "../../../index";
import '../style/index.scss';

interface Props {
	/**
	 * Le code de l'erreur (ex: 404).
	 */
	code?: number | string;
}

/**
 * Composant pour la page d'erreur.
 *
 * @param {Props} props Les propriétés du composant.
 * @returns {JSX.Element} Le rendu de la page d'erreur.
 */
export const Errorpage = ({ code = 404 }: Props) => {
	const navigate = useNavigate();

	return (
		<main className="error-page">
			<div className="error-page__container ">
				<div className="container">
					<Group className="text-secondary mb-4">
						<Icon name="icon-triangle-alert" size="4xl" />
						<h1>Erreur {code}</h1>
					</Group>
					<h2>Oups ! Page non trouvée</h2>
					<p>La page que vous recherchez semble avoir disparu dans le néant numérique.</p>
					<Group className="mt-4">
						<Button onClick={() => navigate("/")} variant="primary">
							Retour à l'accueil
						</Button>

					</Group>
				</div>
			</div>
		</main>
	);
};









