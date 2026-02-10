import React from 'react';
import { Accordion, Button, Group, Icon, Badge } from "../../index";

/**
 * Template de démonstration pour le composant Accordion.
 *
 * @returns {JSX.Element} Le template de démo.
 */
export const Accordions = () => {
	const items = [
		{
			eventKey: '0',
			header: (
				<Group align="center">
					<Icon name="icon-info" />
					<span>Élément d'accordéon #1</span>
					<Badge variant="primary" size="sm">Nouveau</Badge>
				</Group>
			),
			body: (
				<div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					<Button size="sm">Action</Button>
				</div>
			)
		},
		{
			eventKey: '1',
			header: (
				<Group>
					<Icon name="icon-info" />
					<span>Élément d'accordéon #2</span>
				</Group>
			),
			body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		},
	];

	return (
		<div className="accordion-demo">
			<section className="mb-5">
				<h3>Accordéons</h3>
				<p className="text-muted mb-4">
					Créez des <code>accordion</code> s'affichant verticalement en empilant les éléments.
				</p>

				<h5 className="mt-4">Exemple basique</h5>
				<p></p>
				<Accordion defaultActiveKey="0" items={items} border={true} />

				<h5 className="mt-4">État entièrement replié </h5>
				<p></p>
				<Accordion items={items} />

				<h5 className="mt-4">Affichage Flush</h5>
				<p></p>
				<Accordion flush items={items} />

				<h5 className="mt-4">Toujours ouvert</h5>
				<p></p>
				<Accordion alwaysOpen items={items} />

				<h5 className="mt-4">Toggle personnalisé</h5>
				<p></p>
				<Accordion defaultActiveKey="0">
					<Accordion.Item eventKey="0">
						<Group>
							<Accordion.Toggle eventKey="0" variant="outline-primary">
								Cliquez ici pour basculer
							</Accordion.Toggle>
							<Accordion.Toggle eventKey="0" as="span" className="cursor-pointer text-primary underline">
								Ou cliquez sur ce texte
							</Accordion.Toggle>
						</Group>
						<Accordion.Body>
							<h5>Contenu flexible</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita tempora necessitatibus iusto? Ipsam tenetur inventore consequuntur autem quia soluta enim dolorem velit eveniet vitae at, quidem voluptatum possimus illum, digne-ssimos, aut magni provident quaerat qui aliquid odio quos culpa. Ea, repellendus, itaque sapiente incidunt cupiditate eveniet labore distinctio quo vitae blanditiis alias odio obcaecati quasi voluptates doloribus facilis ipsum facere aperiam laudantium tenetur neque molestiae mollitia nesciunt! Odit, voluptas ad. Deleniti nisi mollitia quisquam dolor distinctio ullam eum atque pariatur!</p>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>

				<h5 className="mt-4">ContextToggle</h5>
				<p></p>
				<Accordion defaultActiveKey="0">
					<Accordion.Item eventKey="0">
						<Accordion.ContextToggle as="span" eventKey="0" variant="outline-primary">
							Cliquez ici pour basculer ici
						</Accordion.ContextToggle>
						<Accordion.Body>
							<h5>Contenu flexible</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita tempora necessitatibus iusto? Ipsam tenetur inventore consequuntur autem quia soluta enim dolorem velit eveniet vitae at, quidem voluptatum possimus illum, digne-ssimos, aut magni provident quaerat qui aliquid odio quos culpa. Ea, repellendus, itaque sapiente incidunt cupiditate eveniet labore distinctio quo vitae blanditiis alias odio obcaecati quasi voluptates doloribus facilis ipsum facere aperiam laudantium tenetur neque molestiae mollitia nesciunt! Odit, voluptas ad. Deleniti nisi mollitia quisquam dolor distinctio ullam eum atque pariatur!</p>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>


			</section>
		</div>
	);
};
