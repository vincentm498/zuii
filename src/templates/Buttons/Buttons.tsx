import { Button, Group } from '../../index';
import { tokens } from '../../core/styles/tokens';



interface Props {
	/** Jetons de marque personnalisés */
	brands?: Record<string, any>;
}

/**
 * Template affichant une liste de boutons générée dynamiquement à partir des jetons de marque.
 * @param {Props} props Les propriétés du composant.
 * @returns {JSX.Element} Le composant de démonstration des boutons.
 */
export const Buttons = ({ brands }: Props) => {
	const brandsToUse = brands || tokens.brands;
	const brandKeys = Object.keys(brandsToUse);
	const sizes = tokens?.size
		? Object.keys(tokens.size).filter(key =>
			["xs", "sm", "md", "lg", "xl"].includes(key)
		)
		: ["sm", "md", "lg"];

	return (
		<div className="flex flex-col gap-8">
			{/* Variantes de marque */}
			<Group>
				{brandKeys.map((variant) => (
					<Button key={variant} variant={variant}>
						Button {variant}
					</Button>
				))}
			</Group>

			{/* Variantes Light & Dark */}
			<Group >
				{brandKeys.map((variant) => (
					<Group key={variant} vertical center>
						<Button variant={`${variant}-light`}>
							{variant} light
						</Button>
						<Button variant={`${variant}-dark`}>
							{variant} dark
						</Button>
					</Group>
				))}
			</Group>

			{/* Variantes Outline */}
			<Group>
				{brandKeys.map((variant) => (
					<Group key={variant}>
						<Button variant={`outline-${variant}`}>
							Outline {variant}
						</Button>
						<Button variant={`outline-${variant}-light`}>
							Outline {variant} light
						</Button>
						<Button variant={`outline-${variant}-dark`}>
							Outline {variant} dark
						</Button>
					</Group>
				))}
			</Group>

			{/* Bouton Transparent */}
			<section>
				<h2 className="mb-4 text-xl font-bold">Bouton Transparent</h2>
				<Group>
					<Button transparent>
						Bouton Transparent
					</Button>
					<Button transparent icon="icon-house">
						Transparent avec icône
					</Button>
				</Group>
			</section>

			{/* Tailles */}
			<section>
				<h2 className="mb-4 text-xl font-bold">Tailles</h2>
				<Group>
					{sizes.map((size) => (
						<Button key={size} size={size as any}>
							Size {size}
						</Button>
					))}
				</Group>
			</section>

			{/* Icônes */}
			<section>
				<h2 className="mb-4 text-xl font-bold">Icônes</h2>
				<Group>
					<Button icon="icon-house">
						Avec icône
					</Button>
					<Button icon="icon-house" reverse>
						Icône à droite
					</Button>
					<Button icon="icon-house" btnIcon aria-label="Home" />
					<Button variant="outline-primary" icon="icon-house" btnIcon aria-label="Home" />
				</Group>
			</section>
		</div>
	);
};
