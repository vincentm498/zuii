import { Icon, Group } from '../../index';
import { tokens } from '@core/tokens';

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
export const Icons = ({ brands, spacing }: Props) => {
	const brandsToUse = brands || tokens.brands;
	const spacingToUse = spacing || tokens.spacing;

	const variants = [
		undefined,
		...Object.keys(brandsToUse),
	];

	const sizes = [
		undefined,
		...Object.keys(spacingToUse),
	];

	return (
		<>
			<p>Couleurs d'icônes</p>
			<Group >
				{variants.map((variant) => (
					<Icon
						key={variant || 'default'}
						name="icon-house"
						className={`text-${variant}`}
					/>
				))}
			</Group>
			<p>Tailles d'icônes</p>
			<Group className="flex flex-col gap-2">
				{sizes.map((size) => (
					<div
						key={size || 'default'}
						className="flex items-center gap-2"
					>
						<Icon
							name="icon-house"
							size={size as any}
						/>
						<p>{size}</p>
					</div>
				))}
			</Group>
		</>
	);
};
