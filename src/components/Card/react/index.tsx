import { Card as BootstrapCard, CardProps } from 'react-bootstrap';
import '../style/index.scss';

/**
 * Propriétés du composant Card.
 */
export interface Props extends CardProps {
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
}

/**
 * Composant Card principal.
 * Basé sur React Bootstrap.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Card = ({
	className = "",
	children,
	...props
}: Props) => {
	return (
		<BootstrapCard className={`${className}`.trim()} {...props}>
			{children}
		</BootstrapCard>
	);
};

/**
 * Sous-composant Card.Img avec injection des classes BEM zuii.
 */
Card.Img = ({ className = "", ...props }: any) => (
	<BootstrapCard.Img className={`card__img ${className}`.trim()} {...props} />
);

/**
 * Sous-composant Card.Header avec injection des classes BEM zuii.
 */
Card.Header = ({ className = "", ...props }: any) => (
	<BootstrapCard.Header className={`card__header ${className}`.trim()} {...props} />
);

/**
 * Sous-composant Card.Title avec injection des classes BEM zuii.
 */
Card.Title = ({ className = "", ...props }: any) => (
	<BootstrapCard.Title className={`card__title ${className}`.trim()} {...props} />
);

/**
 * Sous-composant Card.Subtitle avec injection des classes BEM zuii.
 */
Card.Subtitle = ({ className = "", ...props }: any) => (
	<BootstrapCard.Subtitle className={`card__subtitle ${className}`.trim()} {...props} />
);

/**
 * Sous-composant Card.Body avec injection des classes BEM zuii.
 */
Card.Body = ({ className = "", ...props }: any) => (
	<BootstrapCard.Body className={`card__body ${className}`.trim()} {...props} />
);

/**
 * Sous-composant Card.Text avec injection des classes BEM zuii.
 */
Card.Text = ({ className = "", ...props }: any) => (
	<BootstrapCard.Text className={`card__text ${className}`.trim()} {...props} />
);

/**
 * Sous-composant Card.Link avec injection des classes BEM zuii.
 */
Card.Link = ({ className = "", ...props }: any) => (
	<BootstrapCard.Link className={`card__link ${className}`.trim()} {...props} />
);

/**
 * Sous-composant Card.Footer avec injection des classes BEM zuii.
 */
Card.Footer = ({ className = "", ...props }: any) => (
	<BootstrapCard.Footer className={`card__footer ${className}`.trim()} {...props} />
);

/**
 * Sous-composant Card.ImgOverlay avec injection des classes BEM zuii.
 */
Card.ImgOverlay = ({ className = "", ...props }: any) => (
	<BootstrapCard.ImgOverlay className={`card__img-overlay ${className}`.trim()} {...props} />
);
