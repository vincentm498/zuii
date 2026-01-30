import { Button } from '../../index';
import { tokens } from '@core/tokens';



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
	const variants = [
		undefined,
		...Object.keys(brandsToUse),
	];

	return (
		<div className="flex flex-col gap-2">
			{variants.map((variant) => (
				<Button
					key={variant || 'default'}
					variant={variant as any}
					onClick={() => alert(`Cliqué ${variant || 'default'} !`)}
					icon="icon-house"
				>
					Button {variant || 'default'}
				</Button>
			))}
		</div>
	);
};
