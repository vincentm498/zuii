import { Color, Group } from '../../index';
import { tokens } from '@core/tokens';

/**
 * Template Colors pour démontrer le composant Color avec tous les tokens de marque.
 *
 * @returns {JSX.Element} La démo Colors.
 */
export const Colors = () => {
	const brandColors = Object.keys(tokens.brands) as (keyof typeof tokens.brands)[];

	return (
		<div className="section">
			<h2 className="section__title">Brand Colors</h2>
			<div className="section__content">
				<Group>
					{brandColors.map((name) => (
						<Color key={name} name={name} />
					))}
				</Group>
			</div>
		</div>
	);
};
