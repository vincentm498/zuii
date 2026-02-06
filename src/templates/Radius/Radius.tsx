import { Group, Radius as RadiusComponent } from '../../index';
import { tokens } from '../../core/styles/tokens';

/**
 * Template de démonstration pour le composant Radius.
 */
export const Radius = () => {
	const radiusVariants = tokens?.radius ? Object.keys(tokens.radius) as Array<keyof typeof tokens.radius> : [];

	return (
		<div className="flex flex-col gap-8">
			<section>
				<h3 className="mb-4">Radius</h3>
				<Group >
					{radiusVariants.map((variant) => (
						<RadiusComponent key={variant} variant={variant} value={tokens.radius[variant].value} />
					))}
				</Group>
			</section>
		</div>
	);
};
