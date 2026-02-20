import { createGrid, GridApi, GridOptions, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AG_GRID_LOCALE_FR, AG_GRID_LOCALE_EN } from '@ag-grid-community/locale';

// Enregistrement des modules Ag-Grid
ModuleRegistry.registerModules([AllCommunityModule]);

/**
 * Interface pour les données d'une ligne.
 */
export interface RowData {
	[key: string]: any;
}

/**
 * Interface pour la définition d'une colonne.
 */
export interface ColumnDef {
	field: string;
	headerName?: string;
	/**
	 * Fixe la colonne à gauche ou à droite.
	 */
	fixed?: boolean | 'left' | 'right' | string;
	[key: string]: any;
}

/**
 * Options de configuration pour le tableau.
 */
export interface TableOptions {
	/**
	 * Données à afficher dans le tableau.
	 */
	rowData?: RowData[];
	/**
	 * Définition des colonnes du tableau.
	 */
	columnDefs?: ColumnDef[];
	/**
	 * Thème Ag-Grid à utiliser (par défaut: ag-theme-alpine).
	 */
	theme?: string;
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
	/**
	 * Active la sélection de lignes.
	 */
	selectable?: boolean;
	/**
	 * Active la pagination.
	 */
	pagination?: boolean;
	/**
	 * Nombre de lignes par page (par défaut: 10).
	 */
	paginationPageSize?: number;
	/**
	 * Options de taille de page disponibles (par défaut: [10, 20, 50, 100]).
	 */
	pageSizeOptions?: number[];
	/**
	 * Active le redimensionnement des colonnes (par défaut: false).
	 */
	resizable?: boolean;
	/**
	 * Langue du tableau (par défaut: 'fr').
	 */
	locale?: 'fr' | 'en';
	/**
	 * Options personnalisées pour la colonne de sélection (checkbox).
	 */
	selectionColumnDef?: any;
	/**
	 * Règles de classes dynamiques pour les lignes.
	 */
	rowClassRules?: { [cssClassName: string]: (params: any) => boolean };
	/**
	 * Supprime la possibilité de déplacer les colonnes.
	 */
	suppressMovableColumns?: boolean;
	/**
	 * Affiche l'icône de menu/filtre en permanence (ne se cache pas).
	 */
	suppressMenuHide?: boolean;
	/**
	 * Type de modèle de ligne (ex: 'infinite' pour pagination serveur).
	 */
	rowModelType?: 'clientSide' | 'infinite' | 'viewport' | 'serverSide';
	/**
	 * Source de données pour le modèle de ligne 'infinite'.
	 */
	datasource?: any;
	/**
	 * Taille du bloc de données à charger et à mettre en cache.
	 */
	cacheBlockSize?: number;
	/**
	 * Nombre maximum de blocs à conserver en mémoire.
	 */
	maxBlocksInCache?: number;
	/**
	 * Callback appelé lorsque le tableau est prêt.
	 */
	onGridReady?: (event: any) => void;
	/**
	 * Active le tri des colonnes.
	 */
	sortable?: boolean;
	/**
	 * Personnalisation des icônes d'AG Grid.
	 */
	icons?: any;
	/**
	 * Hauteur minimale de la zone vide (en pixels) lorsqu'il n'y a pas de données.
	 * Par défaut: 50px
	 */
	emptyRowsHeight?: string;
	/**
	 * Hauteur des lignes.
	 */
	rowHeight?: number;
	/**
	 * Fonction pour obtenir la hauteur des lignes.
	 */
	getRowHeight?: (params: any) => number;
}

/**
 * Traite les définitions de colonnes pour gérer la propriété 'fixed'.
 *
 * @param {ColumnDef[]} columnDefs - Définitions des colonnes.
 * @returns {ColumnDef[]} Colonnes traitées avec la propriété 'pinned'.
 */
export const processColumnDefs = (columnDefs: ColumnDef[]): ColumnDef[] => {
	return columnDefs.map(col => ({
		...col,
		pinned: (col.fixed === true ? 'left' : col.fixed) as any
	}));
};

/**
 * Retourne les traductions selon la locale.
 *
 * @param {string} locale - La locale à utiliser ('fr' ou 'en').
 * @returns {object} Les traductions Ag-Grid complètes.
 */
export const getLocaleText = (locale: string = 'fr'): any => {
	return locale === 'fr' ? AG_GRID_LOCALE_FR : AG_GRID_LOCALE_EN;
};

/**
 * Initialise un tableau Ag-Grid sur un élément DOM.
 *
 * @param {HTMLElement} element - L'élément conteneur du tableau.
 * @param {TableOptions} options - Options de configuration du tableau.
 * @returns {GridApi} L'API Ag-Grid pour manipulation ultérieure.
 */
export const initTable = (
	element: HTMLElement,
	options: TableOptions = {}
): GridApi => {
	const {
		rowData = [],
		columnDefs = [],
		theme = 'ag-theme-alpine',
		className = '',
		selectable = false,
		pagination = false,
		paginationPageSize = 10,
		resizable = false,
		locale = 'fr',
		suppressMovableColumns = true,
		suppressMenuHide = true,
		sortable = false,
		icons
	} = options;

	// Ajouter les classes CSS
	const baseClass = 'datagrid';
	element.className = `${baseClass} ${theme} ${className}`.trim();
	element.style.width = '100%';

	// Traiter les colonnes
	const processedColumnDefs = processColumnDefs(columnDefs);

	// Configuration Ag-Grid
	const gridOptions: GridOptions = {
		theme: 'legacy', // Utiliser l'ancienne API CSS (v32 style)
		rowData,
		columnDefs: processedColumnDefs,
		domLayout: 'autoHeight',
		pagination,
		paginationPageSize,
		localeText: getLocaleText(locale),
		rowClassRules: options.rowClassRules,
		rowSelection: selectable ? {
			mode: 'multiRow',
			headerCheckbox: true,
			checkboxes: true,
			enableSelectionWithoutKeys: true,
			enableClickSelection: false
		} as any : undefined,
		selectionColumnDef: selectable ? {
			pinned: 'left',
			width: 40,
			minWidth: 40,
			maxWidth: 40,
			headerClass: 'table-cell--center',
			cellClass: 'table-cell--center',
			...options.selectionColumnDef
		} : undefined,
		suppressMovableColumns: suppressMovableColumns,
		suppressMenuHide: suppressMenuHide,
		rowModelType: options.rowModelType,
		datasource: options.datasource,
		cacheBlockSize: options.cacheBlockSize,
		maxBlocksInCache: options.maxBlocksInCache ?? 1,
		onGridReady: options.onGridReady,
		defaultColDef: {
			flex: 1,
			resizable: resizable,
			sortable: sortable,
			unSortIcon: sortable,
		},
		icons: icons
	};

	// Créer et retourner l'API Ag-Grid
	const gridApi = createGrid(element, gridOptions);
	return gridApi;
};

/**
 * Détruit une instance Ag-Grid.
 *
 * @param {GridApi} gridApi - L'API Ag-Grid à détruire.
 */
export const destroyTable = (gridApi: GridApi | null): void => {
	if (gridApi) {
		gridApi.destroy();
	}
};
