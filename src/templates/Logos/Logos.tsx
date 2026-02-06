import { Logo, Group } from '../../index';

/**
 * Template de démonstration pour le composant Logo.
 *
 * @returns {JSX.Element} Le rendu de la démo.
 */
export const Logos = () => {
	return (
		<div className="logos-demo">
			<section className="mb-5">
				<h3>Composant Logo</h3>
				<p>Le composant <code>Logo</code> permet d'afficher des logos de manière uniforme.</p>

				<Group vertical gap="lg">
					<div>
						<h5>Logo par défaut (Placeholder)</h5>
						<Logo />
					</div>

					<div>
						<h5 >Logos d'entreprises (via API Unavatar)</h5>
						<Group gap="xl">
							<Logo
								imgUrl="https://unavatar.io/google.com"
								alt="Google"
							/>
							<Logo
								imgUrl="https://unavatar.io/github.com"
								alt="GitHub"
							/>
							<Logo
								imgUrl="https://unavatar.io/apple.com"
								alt="Apple"
							/>
							<Logo
								imgUrl="https://unavatar.io/microsoft.com"
								alt="Microsoft"
							/>
						</Group>
					</div>

					<div>
						<h5 >Variantes de tailles via classes CSS</h5>
						<Group gap="lg" >
							<Logo
								className="logo--small"
								imgUrl="https://unavatar.io/spotify.com"
								alt="Spotify Small"
							/>
							<Logo
								imgUrl="https://unavatar.io/spotify.com"
								alt="Spotify Default"
							/>
							<Logo
								className="logo--large"
								imgUrl="https://unavatar.io/spotify.com"
								alt="Spotify Large"
							/>
						</Group>
					</div>
				</Group>
			</section>
		</div>
	);
};
