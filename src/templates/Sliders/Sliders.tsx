import React from 'react';
import { Slider, SliderItem, Card, Button } from '../../index';

/**
 * Template de démonstration pour le composant Slider.
 */
export const Sliders = () => {
	const generatePlaceholder = (text: string, bgColor: string = "#e2e8f0", color: string = "#64748b") => (
		<div style={{
			height: '200px',
			backgroundColor: bgColor,
			color: color,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '8px',
			fontSize: '1.25rem',
			fontWeight: 600,
			width: '100%',
		}}>
			{text}
		</div>
	);

	return (
		<div className="Sliders-demo">
			<section className="mb-5">
				<h3>Sliders</h3>
				<p className="text-muted mb-4">Le composant <code>Slider</code> utilise SplideJS pour créer des carrousels performants et accessibles.</p>

				<h5 className='mt-4'>Basique</h5>
				<p className="text-muted mb-4">Un slider simple avec flèches et pagination par défaut.</p>
				<Slider options={{ type: 'loop', perPage: 1 }}>
					<SliderItem>
						{generatePlaceholder('Slide 1', '#fecaca', '#b91c1c')}
					</SliderItem>
					<SliderItem>
						{generatePlaceholder('Slide 2', '#bfdbfe', '#1d4ed8')}
					</SliderItem>
					<SliderItem>
						{generatePlaceholder('Slide 3', '#bbf7d0', '#15803d')}
					</SliderItem>
				</Slider>

				<h5 className='mt-5'>Plusieurs éléments (Per Page)</h5>
				<p className="text-muted mb-4">Afficher plusieurs éléments sur la même vue avec un espace (gap).</p>
				<Slider options={{ type: 'loop', perPage: 3, gap: '1rem', breakpoints: { 768: { perPage: 2 }, 480: { perPage: 1 } } }}>
					{Array.from({ length: 6 }).map((_, i) => (
						<SliderItem key={i}>
							{generatePlaceholder(`Item ${i + 1}`)}
						</SliderItem>
					))}
				</Slider>

				<h5 className='mt-5'>Autoplay & Sans Flèches</h5>
				<p className="text-muted mb-4">Défilement automatique continu sans les contrôles de navigation.</p>
				<Slider options={{
					type: 'loop',
					perPage: 2,
					gap: '1rem',
					autoplay: true,
					interval: 2000,
					arrows: false,
					pagination: true
				}}>
					{Array.from({ length: 4 }).map((_, i) => (
						<SliderItem key={i}>
							{generatePlaceholder(`Autoplay ${i + 1}`, '#fde68a', '#b45309')}
						</SliderItem>
					))}
				</Slider>

				<h5 className='mt-5'>Fondu (Fade)</h5>
				<p className="text-muted mb-4">Transition en fondu au lieu du glissement.</p>
				<Slider options={{ type: 'fade', rewind: true }}>
					<SliderItem>
						{generatePlaceholder('Fade 1', '#e9d5ff', '#7e22ce')}
					</SliderItem>
					<SliderItem>
						{generatePlaceholder('Fade 2', '#fbcfe8', '#be185d')}
					</SliderItem>
				</Slider>


				<Slider options={{ type: 'loop', perPage: 3, gap: '1rem', arrows: false, pagination: true, breakpoints: { 768: { perPage: 2 }, 480: { perPage: 1 } } }}>
					<SliderItem>
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
					</SliderItem>
					<SliderItem>
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
					</SliderItem>
					<SliderItem>
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
					</SliderItem>
					<SliderItem>
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
					</SliderItem>
					<SliderItem>
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
					</SliderItem>
				</Slider>
			</section>
		</div>
	);
};
