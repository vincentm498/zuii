import { Tabs, Group, Icon, Badge, Button } from "../../index";
import { useState } from "react";

/**
 * Template de démonstration pour le composant Tabs.
 *
 * @returns {JSX.Element} Le template de démo.
 */
export const TabsTemplate = () => {
	const [activeKey, setActiveKey] = useState("v-1");

	const handleSelect = (key: string | null) => {
		if (key) {
			setActiveKey(key);
		}
	};

	const items = [
		{
			eventKey: 'home',
			header: (
				<Group align="center" gap="xs">
					<Icon name="icon-house" />
					<span>Accueil</span>
				</Group>
			),
			body: (
				<>
					<h4>Bienvenue à l'accueil</h4>
					<p>Ceci est le contenu de l'onglet Accueil. On peut y mettre n'importe quel JSX.</p>
				</>
			)
		},
		{
			eventKey: 'profile',
			header: (
				<Group align="center" gap="xs">
					<span>Profil</span>
					<Badge variant="success" size="sm">9+</Badge>
				</Group>
			),
			body: 'Contenu du profil utilisateur.'
		},
		{
			eventKey: 'contact',
			header: 'Contact',
			body: 'Informations de contact.',
			disabled: true
		},
	];

	const itemsVertical = [
		{
			eventKey: 'v-1',
			header: 'Design',
			body: (
				<>
					<h5>Design System</h5>
					<p>Focus sur l'expérience utilisateur et les tokens de design.</p>
				</>
			)
		},
		{
			eventKey: 'v-2',
			header: 'Développement',
			body: (
				<>
					<h5>Clean Code</h5>
					<p>Implémentation robuste avec React et TypeScript.</p>
				</>
			)
		},
		{
			eventKey: 'v-3',
			header: 'Marketing',
			body: (
				<>
					<h5>Marketing</h5>
					<p>Mise en place de stratégies marketing pour promouvoir le produit.</p>
				</>
			)
		},
		{
			eventKey: 'v-4',
			header: 'SEO & Analytics',
			body: (
				<>
					<h5>SEO & Analytics</h5>
					<p>Optimisation pour les moteurs de recherche.</p>
				</>
			)
		},
		{
			eventKey: 'v-5',
			header: 'DevOps',
			body: (
				<>
					<h5>DevOps</h5>
					<p>Déploiement continu et automatisation des processus.</p>
				</>
			)
		},
	];

	return (
		<div className="tabs-demo">
			<section className="mb-5">
				<h3>Composant Tabs</h3>
				<p className="text-muted mb-4">
					Le composant <code>Tabs</code> permet d'organiser le contenu en plusieurs onglets navigables.
				</p>

				<h5 className="mt-4">Exemple basique</h5>
				<p className="text-muted small">Utilisation de la propriété <code>items</code> pour définir les onglets.</p>
				<Tabs defaultActiveKey="home" items={items} id="tabs-example-basic" />

				<h5 className="mt-4">Variante Pills</h5>
				<p className="text-muted small">Onglets avec un style de pilules arrondies.</p>
				<Tabs defaultActiveKey="home" color="danger" variant="pills" items={items} id="tabs-example-pills-danger" />

				<h5 className="mt-4">Variante border</h5>
				<p className="text-muted small">Onglets avec une bordure.</p>
				<Tabs defaultActiveKey="home" color="success" border items={items}  id="tabs-example-pills-success" />

				<h5 className="mt-4">Variante Underline</h5>
				<p className="text-muted small">Onglets avec une ligne de soulignement pour l'onglet actif.</p>
				<Tabs defaultActiveKey="home" color="warning" variant="underline" items={items} id="tabs-example-underline" />

				<h5 className="mt-4">Remplissage proportionnel (Fill)</h5>
				<p className="text-muted small">Les onglets occupent toute la largeur disponible proportionnellement à leur contenu.</p>
				<Tabs variant="underline" defaultActiveKey="home" fill items={
					[
						{
							eventKey: 'home',
							header: (
								<Group align="center" gap="xs">
									<span>Très Loooooooong tab </span>
									<Badge variant="success" size="sm">9+</Badge>
								</Group>
							),
							body: 'Contenu de l\'onglet Accueil'
						},
						{
							eventKey: 'profile',
							header: 'Profil',
							body: 'Contenu de l\'onglet Profil'
						},
						{
							eventKey: 'contact',
							header: 'Contact',
							body: 'Contenu de l\'onglet Contact'
						}
					]
				} id="tabs-example-fill" />

				<h5 className="mt-4">Alignement égal (Justify)</h5>
				<p className="text-muted small">Les onglets sont alignés de manière égale sur toute la largeur.</p>
				<Tabs variant="underline" defaultActiveKey="home" justify items={
					[
						{
							eventKey: 'home',
							header: (
								<Group align="center" gap="xs">
									<span>Très Loooooooong tab </span>
									<Badge variant="danger" size="sm">9+</Badge>
								</Group>
							),
							body: 'Contenu de l\'onglet Accueil'
						},
						{
							eventKey: 'profile',
							header: 'Profil',
							body: 'Contenu de l\'onglet Profil'
						},
						{
							eventKey: 'contact',
							header: 'Contact',
							body: 'Contenu de l\'onglet Contact'
						}
					]
				} id="tabs-example-justify" />

				<h5 className="mt-4">Mode composé</h5>
				<p className="text-muted small">Utilisation de <code>Tabs.Item</code> pour une flexibilité totale.</p>
				<Tabs defaultActiveKey="custom-1" id="tabs-example-custom">
					<Tabs.Item eventKey="custom-1" title="Onglet 1">
						<div className="p-3">Contenu 1</div>
					</Tabs.Item>
					<Tabs.Item eventKey="custom-2"
					title={
						<Group align="center" gap="xs">
							<span>Profil</span>
							<Badge variant="secondary" size="sm">9+</Badge>
						</Group>
					}
					>
						<div className="p-3">Contenu 2</div>
					</Tabs.Item>
				</Tabs>

				<h5 className="mt-4">Disposition verticale</h5>
				<p className="text-muted small">Onglets affichés verticalement avec la propriété <code>vertical</code>.</p>
				<Tabs
					defaultActiveKey="home"
					vertical
					items={items}
					id="tabs-example-vertical"
				/>

				<h5 className="mt-4">Disposition verticale personnalisée</h5>
				<p className="text-muted small">Utilisation de <code>Tabs.Container</code>, <code>Button</code> et <code>Tabs.Content</code> pour un contrôle total.</p>
				<Tabs.Container activeKey={activeKey} onSelect={handleSelect} id="tabs-custom-vertical">
					<Group className="tabs tabs--vertical tabs--primary">
						<Group vertical className="tabs__nav tabs__nav--vertical">
							<Button
								variant="transparent"
								onClick={() => handleSelect("v-1")}
								active={activeKey === "v-1"}
							>
								Design
							</Button>
							<Button
								variant="transparent"
								onClick={() => handleSelect("v-2")}
								active={activeKey === "v-2"}
							>
								Développement
							</Button>
							<Button
								variant="transparent"
								onClick={() => handleSelect("v-3")}
								active={activeKey === "v-3"}
							>
								Marketing
							</Button>
							<Button
								variant="transparent"
								onClick={() => handleSelect("v-4")}
								active={activeKey === "v-4"}
							>
								SEO & Analytics
							</Button>
							<Button
								variant="transparent"
								onClick={() => handleSelect("v-5")}
								active={activeKey === "v-5"}
							>
								DevOps
							</Button>

						</Group>
						<Tabs.Content className="tabs__content">
							<Tabs.Pane eventKey="v-1">
								<h5>Design System</h5>
								<p>Focus sur l'expérience utilisateur et les tokens de design.</p>
							</Tabs.Pane>
							<Tabs.Pane eventKey="v-2">
								<h5>Clean Code</h5>
								<p>Implémentation robuste avec React et TypeScript.</p>
							</Tabs.Pane>
							<Tabs.Pane eventKey="v-3">
								<h5>Marketing</h5>
								<p>Mise en place de stratégies marketing pour promouvoir le produit.</p>
							</Tabs.Pane>
							<Tabs.Pane eventKey="v-4">
								<h5>SEO & Analytics</h5>
								<p>Optimisation pour les moteurs de recherche.</p>
							</Tabs.Pane>
							<Tabs.Pane eventKey="v-5">
								<h5>DevOps</h5>
								<p>Déploiement continu et automatisation des processus.</p>
							</Tabs.Pane>
						</Tabs.Content>
					</Group>
				</Tabs.Container>
			</section>
		</div>
	);
};


