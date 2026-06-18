import { useNavigate } from "react-router-dom";
import { Group, Icon, Button } from "../../../index";
import '../style/index.scss';

interface ErrorpageTexts {
	errorLabel?: string;
	title?: string;
	message?: string;
	backButton?: string;
}

const defaultTexts: Required<ErrorpageTexts> = {
	errorLabel: "Erreur",
	title: "Oups ! Page non trouvée",
	message: "La page que vous recherchez semble avoir disparu dans le néant numérique.",
	backButton: "Retour à l'accueil",
};

interface Props {
	/**
	 * Le code de l'erreur (ex: 404).
	 */
	code?: number | string;
	/**
	 * Textes personnalisés pour la traduction.
	 */
	texts?: ErrorpageTexts;
}

/**
 * Composant pour la page d'erreur.
 *
 * @param props Les propriétés du composant.
 * @returns {JSX.Element} Le rendu de la page d'erreur.
 */
export const Errorpage = ({ code = 404, texts }: Props) => {
	const navigate = useNavigate();
	const t = { ...defaultTexts, ...texts };

	return (
		<main className="error-page">
			<div className="error-page__container ">
				<div className="container">
					<Group className="text-secondary mb-4">
						<Icon name="icon-triangle-alert" size="4xl" />
						<h1>{t.errorLabel} {code}</h1>
					</Group>
					<h2>{t.title}</h2>
					<p>{t.message}</p>
					<Group className="mt-4">
						<Button onClick={() => navigate("/")} variant="primary">
							{t.backButton}
						</Button>

					</Group>
				</div>
			</div>
		</main>
	);
};









