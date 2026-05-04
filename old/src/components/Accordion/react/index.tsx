import { Accordion as BootstrapAccordion, AccordionProps, useAccordionButton } from 'react-bootstrap';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useContext } from 'react';
import { Button } from '../../Button/react';
import '../style/index.scss';

/**
 * Interface pour un élément individuel de l'accordéon.
 */
interface AccordionItem {
	/**
	 * Le titre de l'élément (affiché dans le header).
	 */
	header: React.ReactNode;
	/**
	 * Le contenu de l'élément (affiché dans le body).
	 */
	body: React.ReactNode;
	/**
	 * La clé unique de l'élément.
	 */
	eventKey: string;

	/**
	 * Ajoute une bordure autour de l'élément.
	 */
	border?: boolean;
}

/**
 * Propriétés du composant Accordion.
 */
interface Props extends AccordionProps {
	/**
	 * Liste d'objets définissant les éléments de l'accordéon.
	 */
	items?: AccordionItem[];
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Ajoute une bordure autour de l'élément.
	 */
	border?: boolean;
}

/**
 * Composant Accordion basé sur React Bootstrap.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Accordion = ({
	items = [],
	children,
	className = "",
	border = false,
	...props
}: Props) => {
	const bemBase = "accordion";
	const borderClass = border ? `${bemBase}--border` : "";

	return (
		<div className={`${bemBase}__wrapper `.trim()}>
			<BootstrapAccordion className={`${className}`.trim()} {...props}>
				{items.length > 0 ? (
					items.map((item, index) => (
						<BootstrapAccordion.Item
							key={index}
							eventKey={item.eventKey}
							className={`${bemBase}__item ${borderClass}`.trim()}
						>
							<BootstrapAccordion.Header className={`${bemBase}__header`}>
								{item.header}
							</BootstrapAccordion.Header>
							<BootstrapAccordion.Body className={`${bemBase}__body`}>
								{item.body}
							</BootstrapAccordion.Body>
						</BootstrapAccordion.Item>
					))
				) : (
					children
				)}
			</BootstrapAccordion>
		</div>
	);
};

/**
 * Sous-composant Accordion.Item avec injection des classes BEM zuii.
 */
Accordion.Item = ({ className = "", border = false, ...props }: any) => {
	const borderClass = border ? "accordion--border" : "";
	return (
		<BootstrapAccordion.Item className={`accordion__item ${borderClass} ${className}`.trim()} {...props} />
	);
};

/**
 * Sous-composant Accordion.Header avec injection des classes BEM zuii.
 */
Accordion.Header = ({ className = "", ...props }: any) => (
	<BootstrapAccordion.Header className={`accordion__header ${className}`.trim()} {...props} />
);

/**
 * Sous-composant Accordion.Body avec injection des classes BEM zuii.
 */
Accordion.Body = ({ className = "", ...props }: any) => (
	<BootstrapAccordion.Body className={`accordion__body ${className}`.trim()} {...props} />
);


/**
 * Interface pour les propriétés du composant ContextToggle.
 */
interface ContextToggleProps {
	/**
	 * Contenu du bouton.
	 */
	children: React.ReactNode;
	/**
	 * Clé de l'élément à contrôler.
	 */
	eventKey: string;
	/**
	 * Callback optionnel au clic.
	 */
	callback?: (eventKey: string) => void;
	/**
	 * L'élément ou composant à utiliser pour le rendu (défaut: Button).
	 */
	as?: React.ElementType;
	/**
	 * Variante de couleur Bootstrap. Par défaut primary ou success si ouvert.
	 */
	variant?: string;
	/**
	 * Classe additionnelle.
	 */
	className?: string;
	/**
	 * Autres propriétés.
	 */
	[key: string]: any;
}

/**
 * Sous-composant Accordion.ContextToggle.
 * Un bouton qui change d'état (couleur/texte) selon si l'accordéon est ouvert ou fermé.
 */
Accordion.ContextToggle = ({
	children,
	eventKey,
	callback,
	as: Component = Button,
	variant,
	className = "",
	...props
}: ContextToggleProps) => {
	const { activeEventKey } = useContext(AccordionContext);

	const decoratedOnClick = useAccordionButton(
		eventKey,
		() => callback && callback(eventKey),
	);

	const isCurrentEventKey = activeEventKey === eventKey;

	return (
		<Component
			variant={variant || (isCurrentEventKey ? 'success' : 'primary')}
			onClick={decoratedOnClick}
			className={className}
			{...props}
		>
			{children} {isCurrentEventKey ? ' (Ouvert)' : ' (Fermé)'}
		</Component>
	);
};


/**
 * Interface pour les propriétés du composant Toggle.
 */
interface ToggleProps {
	/**
	 * Contenu du toggle.
	 */
	children: React.ReactNode;
	/**
	 * Clé de l'élément à contrôler.
	 */
	eventKey: string;
	/**
	 * Callback optionnel au clic.
	 */
	callback?: (eventKey: string) => void;
	/**
	 * L'élément ou composant à utiliser pour le rendu (défaut: Button).
	 */
	as?: React.ElementType;
	/**
	 * Classe additionnelle.
	 */
	className?: string;
	/**
	 * Autres propriétés.
	 */
	[key: string]: any;
}

/**
 * Sous-composant Accordion.Toggle.
 * Un déclencheur générique pour l'accordéon.
 */
Accordion.Toggle = ({
	children,
	eventKey,
	callback,
	as: Component = Button,
	className = "",
	...props
}: ToggleProps) => {
	const decoratedOnClick = useAccordionButton(
		eventKey,
		() => callback && callback(eventKey),
	);

	return (
		<Component
			onClick={decoratedOnClick}
			className={className}
			{...props}
		>
			{children}
		</Component>
	);
};

/**
 * Exposition des utilitaires de React Bootstrap sur le composant Accordion.
 */
Accordion.useAccordionButton = useAccordionButton;
Accordion.AccordionContext = AccordionContext;


/**
 * Export des utilitaires de React Bootstrap pour l'Accordion.
 */
export { useAccordionButton, AccordionContext };

