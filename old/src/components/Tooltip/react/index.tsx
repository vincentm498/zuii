import { Tooltip as BootstrapTooltip, OverlayTrigger } from "react-bootstrap";
import { Placement } from "react-bootstrap/esm/types";
import { cloneElement, forwardRef, useMemo } from "react";
import '../style/index.scss';

/**
 * Propriétés du composant Tooltip.
 */
interface Props {
	/**
	 * Le contenu de l'info-bulle (texte ou ReactNode).
	 */
	content: React.ReactNode;
	/**
	 * L'élément sur lequel l'info-bulle doit apparaître.
	 */
	children: React.ReactElement;
	/**
	 * Position de l'info-bulle.
	 * - top : en haut (avec repositionnement automatique si pas d'espace)
	 * - bottom : en bas
	 * - left : à gauche
	 * - right : à droite
	 * - auto : automatique (privilégie le bas par défaut)
	 */
	placement?: Placement | "auto";
	/**
	 * Délai d'affichage en millisecondes.
	 */
	delay?: number | { show: number; hide: number };
	/**
	 * Classe CSS additionnelle pour le tooltip.
	 */
	className?: string;
	/**
	 * Contrôle l'affichage du tooltip.
	 * - true : toujours affiché
	 * - false : toujours caché
	 * - undefined : comportement par défaut (au survol)
	 */
	show?: boolean;
}

// Wrapper pour supprimer l'attribut aria-describedby et assurer un positionnement relatif stable
// eslint-disable-next-line react/display-name
const TriggerProxy = forwardRef(({ children, ...props }: any, ref) => {
	// On extrait aria-describedby pour ne pas le passer à l'enfant
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { "aria-describedby": ariaDescribedBy, ...rest } = props;

	// Vérification que children existe
	if (!children) {
		return null;
	}

	// On clone l'élément enfant en lui ajoutant la ref et les props (événements)
	// On force position: relative pour aider au positionnement si nécessaire
	return cloneElement(children, {
		ref,
		...rest,
		style: { ...children.props?.style, position: "relative" }
	});
});

/**
 * Composant Tooltip.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Tooltip = ({
	content = "Tooltip",
	children,
	placement = "auto",
	delay = { show: 200, hide: 0 },
	className = "",
	show,
}: Props) => {
	// Génération d'un ID stable pour éviter l'accumulation d'IDs dans aria-describedby (si on le gardait)
	const tooltipId = useMemo(() => `tooltip-${Math.random().toString(36).substr(2, 9)}`, []);

	const renderTooltip = (props: any) => (
		<BootstrapTooltip
			id={tooltipId}
			className={`mow-tooltip ${className}`.trim()}
			{...props}
		>
			{content}
		</BootstrapTooltip>
	);

	return (
		<OverlayTrigger
			placement={placement as Placement}
			delay={delay}
			overlay={renderTooltip}
			show={show}
		>
			<TriggerProxy>{children}</TriggerProxy>
		</OverlayTrigger>
	);
};
