import { MemoryRouter } from 'react-router-dom';
import { Errorpage } from '../../index';

/**
 * Template de démonstration pour le composant Errorpage.
 */
export const Errorpages = () => {
	return (
		<div className="Errorpages-demo">
			<section className="mb-5">
				<h3>Errorpages</h3>
				<p className="text-muted mb-4">Le composant <code>Errorpage</code> affiche une page d'erreur avec code et textes personnalisables.</p>
				<h5 className='mt-4'>Français (défaut)</h5>
				<MemoryRouter>
					<Errorpage code={404} />
				</MemoryRouter>
				<h5 className='mt-4'>Anglais</h5>
				<MemoryRouter>
					<Errorpage
						code={404}
						texts={{
							errorLabel: "Error",
							title: "Oops! Page not found",
							message: "The page you are looking for seems to have vanished into the digital void.",
							backButton: "Back to home",
						}}
					/>
				</MemoryRouter>
			</section>
		</div>
	);
};
