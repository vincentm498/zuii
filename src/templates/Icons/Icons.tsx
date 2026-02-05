import { Icon } from '../../index';
import { tokens } from '../../core/styles/tokens';
import { Group } from '../../index';

interface Props {
	/** Jetons de marque personnalisés */
	brands?: Record<string, any>;
	/** Jetons d'espacement (tailles) personnalisés */
	spacing?: Record<string, any>;
}

/**
 * Template affichant une liste d'icônes générée dynamiquement à partir des jetons.
 * @param {Props} props Les propriétés du composant.
 * @returns {JSX.Element} Le composant de démonstration des icônes.
 */
export const Icons = ({ brands }: Props) => {
	const brandsToUse = brands || tokens.brands;
	const brandKeys = Object.keys(brandsToUse);
	const sizes: ("xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl")[] = [
		"xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"
	];

	return (
		<div className="flex flex-col gap-8">
			<h2>Icons</h2>
			{/* Couleurs d'icônes */}
			<section>
				<h2 className="mb-4 text-xl font-bold">Couleurs d'icônes</h2>
				<Group className="flex flex-wrap gap-4 text-2xl">
					{brandKeys.map((variant) => (
						<Group key={variant} vertical center>
							<Icon
								name="icon-house"
								className={`text-${variant}`}
								size="lg"
							/>
							<span className="text-xs opacity-50">{variant}</span>
						</Group>
					))}
				</Group>
			</section>

			{/* Tailles d'icônes */}
			<section>
				<h2 className="mb-4 text-xl font-bold">Tailles d'icônes (xs à 4xl)</h2>
				<Group >
					{sizes.map((size) => (
						<Group key={size} vertical center>
							<Icon
								name="icon-house"
								size={size}
								className="text-primary"
							/>
							<p className="text-xs font-mono">{size}</p>
						</Group>
					))}
				</Group>
			</section>
		</div>
	);
};
