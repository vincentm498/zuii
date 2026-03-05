import { ReactNode, HTMLAttributes } from 'react';
import '../style/index.scss';

/**
 * Liste des gaps autorisés.
 */
type GapSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64;

/**
 * Nombre de colonnes de la grille (1-24).
 */
type GridSpan = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

/**
 * Propriétés du composant Grid.
 */
interface GridProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Les éléments à afficher dans la grille.
	 */
	children: ReactNode;
	/**
	 * Espacement global.
	 */
	gap?: GapSize;
	/**
	 * Espacement horizontal (X).
	 */
	gapX?: GapSize;
	/**
	 * Espacement vertical (Y).
	 */
	gapY?: GapSize;
	/**
	 * Gaps responsives.
	 */
	smGap?: GapSize;
	smGapX?: GapSize;
	smGapY?: GapSize;
	mdGap?: GapSize;
	mdGapX?: GapSize;
	mdGapY?: GapSize;
	lgGap?: GapSize;
	lgGapX?: GapSize;
	lgGapY?: GapSize;
	xlGap?: GapSize;
	xlGapX?: GapSize;
	xlGapY?: GapSize;
}

/**
 * Composant Grid utilisant CSS Grid avec 24 colonnes.
 *
 * @param {GridProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Grid = ({
	children,
	gap = 2,
	gapX,
	gapY,
	smGap,
	smGapX,
	smGapY,
	mdGap,
	mdGapX,
	mdGapY,
	lgGap,
	lgGapX,
	lgGapY,
	xlGap,
	xlGapX,
	xlGapY,
	className = "",
	...props
}: GridProps) => {
	const baseClass = "grid";
	const classes = [baseClass];

	// Défaut
	if (gap !== undefined) classes.push(`${baseClass}--gap-${gap}`);
	if (gapX !== undefined) classes.push(`${baseClass}--gap-x-${gapX}`);
	if (gapY !== undefined) classes.push(`${baseClass}--gap-y-${gapY}`);

	// SM
	if (smGap !== undefined) classes.push(`${baseClass}--gap-sm-${smGap}`);
	if (smGapX !== undefined) classes.push(`${baseClass}--gap-x-sm-${smGapX}`);
	if (smGapY !== undefined) classes.push(`${baseClass}--gap-y-sm-${smGapY}`);

	// MD
	if (mdGap !== undefined) classes.push(`${baseClass}--gap-md-${mdGap}`);
	if (mdGapX !== undefined) classes.push(`${baseClass}--gap-x-md-${mdGapX}`);
	if (mdGapY !== undefined) classes.push(`${baseClass}--gap-y-md-${mdGapY}`);

	// LG
	if (lgGap !== undefined) classes.push(`${baseClass}--gap-lg-${lgGap}`);
	if (lgGapX !== undefined) classes.push(`${baseClass}--gap-x-lg-${lgGapX}`);
	if (lgGapY !== undefined) classes.push(`${baseClass}--gap-y-lg-${lgGapY}`);

	// XL
	if (xlGap !== undefined) classes.push(`${baseClass}--gap-xl-${xlGap}`);
	if (xlGapX !== undefined) classes.push(`${baseClass}--gap-x-xl-${xlGapX}`);
	if (xlGapY !== undefined) classes.push(`${baseClass}--gap-y-xl-${xlGapY}`);

	if (className) classes.push(className);

	return (
		<div className="grid-container">
			<div
				className={classes.join(" ").trim()}
				{...props}
			>
				{children}
			</div>
		</div>
	);
};

/**
 * Propriétés du composant GridItem.
 */
interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Contenu de l'item.
	 */
	children?: ReactNode;
	/**
	 * Nombre de colonnes occupées par défaut (1-24).
	 */
	span?: GridSpan;
	/**
	 * Nombre de colonnes occupées sur petit écran (sm).
	 */
	sm?: GridSpan;
	/**
	 * Nombre de colonnes occupées sur écran moyen (md).
	 */
	md?: GridSpan;
	/**
	 * Nombre de colonnes occupées sur grand écran (lg).
	 */
	lg?: GridSpan;
	/**
	 * Nombre de colonnes occupées sur très grand écran (xl).
	 */
	xl?: GridSpan;
}

/**
 * Composant GridItem permettant de gérer le positionnement dans la grille.
 *
 * @param {GridItemProps} props - Les propriétés de l'item.
 * @returns {JSX.Element} Le rendu de l'item.
 */
export const GridItem = ({
	children,
	span = 24,
	sm,
	md,
	lg,
	xl,
	className = "",
	...props
}: GridItemProps) => {
	const baseClass = "grid__item";
	const classes = [baseClass];

	if (span !== undefined) classes.push(`${baseClass}--${span}`);
	if (sm !== undefined) classes.push(`${baseClass}--sm-${sm}`);
	if (md !== undefined) classes.push(`${baseClass}--md-${md}`);
	if (lg !== undefined) classes.push(`${baseClass}--lg-${lg}`);
	if (xl !== undefined) classes.push(`${baseClass}--xl-${xl}`);

	if (className) classes.push(className);

	return (
		<div
			className={classes.join(" ").trim()}
			{...props}
		>
			{children}
		</div>
	);
};


/**
 * Composant Spacer permettant de générer un espace vide contrôlé par le système de grille.
 *
 * @param {GridItemProps} props - Les propriétés de l'espaceur.
 * @returns {JSX.Element} Le rendu de l'espaceur.
 */
export const GridSpacer = (props: GridItemProps) => {
	return <GridItem {...props} />;
};


