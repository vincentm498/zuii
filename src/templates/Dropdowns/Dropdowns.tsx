import { Dropdown } from "../../index";
import { Group } from "../../index";
import { Icon } from "../../index";

/**
 * Template de démonstration pour le composant Dropdown.
 *
 * @returns {JSX.Element} Le template de démo.
 */
export const Dropdowns = () => {
	const simpleItems = [
		{ label: "Action", href: "#" },
		{ label: "Another action", href: "#" },
		{ type: "divider" as const },
		{ label: "Separated link", href: "#" },
	];

	return (
		<div className="flex flex-col gap-12">
			<section>
				<h2 className="mb-6">Dropdowns</h2>

				<Group vertical>
					{/* Basique */}
					<div className="dropdown-demo__section">
						<h4 className="mb-4 text-muted">Basique</h4>
						<Dropdown label="Mon Dropdown" items={simpleItems} />
					</div>


					{/* Variantes */}
					<div className="dropdown-demo__section">
						<h4 className="mb-4 text-muted">Variantes de couleurs</h4>
						<Group>
							<Dropdown label="Primary" variant="primary" items={simpleItems} />
							<Dropdown label="Secondary" variant="secondary" items={simpleItems} />
							<Dropdown label="Success" variant="success" items={simpleItems} />
							<Dropdown label="Danger" variant="danger" items={simpleItems} />
							<Dropdown label="Warning" variant="warning" items={simpleItems} />
							<Dropdown label="Info" variant="info" items={simpleItems} />
							<Dropdown label="Light" variant="light" items={simpleItems} />
							<Dropdown label="Dark" variant="dark" items={simpleItems} />
						</Group>
					</div>


					{/* Alignements */}
					<div className="dropdown-demo__section">
						<h4 className="mb-4 text-muted">Alignements</h4>
						<Group>
							<Dropdown label="Aligné à gauche (Start)" align="start" items={simpleItems} />
							<Dropdown label="Aligné à droite (End)" align="end" items={simpleItems} />
						</Group>
					</div>


					{/* Custom Children */}
					<div className="dropdown-demo__section">
						<h4 className="mb-4 text-muted">Contenu personnalisé (Children)</h4>
						<Dropdown>
							<Dropdown.Toggle variant="outline-primary">
								Custom Toggle
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
								<Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item href="#/action-3">
									<Group>
										<Icon name="icon-check" />
										Action 3
									</Group>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</Group>
			</section>
		</div>
	);
};
