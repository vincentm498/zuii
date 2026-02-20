import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, GridApi } from 'ag-grid-community';
import { processColumnDefs, getLocaleText, TableOptions, RowData, ColumnDef } from '../js/table';
import { TablePagination } from './TablePagination';
import '../style/index.scss';

// Enregistrement des modules Ag-Grid
ModuleRegistry.registerModules([AllCommunityModule]);

/**
 * Propriétés du composant Table.
 */
interface Props extends TableOptions {
	// Hérite de toutes les propriétés de TableOptions
}

/**
 * Composant Table utilisant Ag-Grid.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const Table = ({
	rowData,
	columnDefs = [],
	theme = "ag-theme-alpine",
	className = "",
	selectable = false,
	pagination = false,
	paginationPageSize = 10,
	pageSizeOptions,
	resizable = false,
	locale = 'fr',
	selectionColumnDef,
	rowClassRules,
	rowModelType,
	datasource,
	cacheBlockSize,
	maxBlocksInCache = 1,
	onGridReady,
	sortable = false,
	icons,
	emptyRowsHeight = '2rem',
	rowHeight = 25,
	getRowHeight
}: Props) => {
	const baseClass = "datagrid";
	const wrapperClass = `${baseClass} ${theme} ${className}`.trim();
	const containerRef = useRef<HTMLDivElement>(null);

	const [gridApi, setGridApi] = useState<GridApi | null>(null);
	const [paginationState, setPaginationState] = useState({
		currentPage: 0,
		totalPages: 0,
		pageSize: paginationPageSize,
		totalRows: 0,
	});

	const processedColumnDefs = useMemo(() => processColumnDefs(columnDefs), [columnDefs]);
	const localeText = useMemo(() => getLocaleText(locale), [locale]);

	const handleGridReady = useCallback((params: any) => {
		setGridApi(params.api);
		if (onGridReady) onGridReady(params);
	}, [onGridReady]);

	const onPaginationChanged = useCallback((event: any) => {
		if (event.api) {
			const newPage = event.api.paginationGetCurrentPage();
			const newTotalPages = event.api.paginationGetTotalPages();
			const newPageSize = event.api.paginationGetPageSize();
			const newTotalRows = event.api.paginationGetRowCount();

			setPaginationState(prev => {
				// Éviter les mises à jour inutiles qui causent des boucles de rendu
				if (
					prev.currentPage === newPage &&
					prev.totalPages === newTotalPages &&
					prev.pageSize === newPageSize &&
					prev.totalRows === newTotalRows
				) {
					return prev;
				}
				return {
					currentPage: newPage,
					totalPages: newTotalPages,
					pageSize: newPageSize,
					totalRows: newTotalRows,
				};
			});
		}
	}, []);

	const onPageChange = useCallback((page: number) => {
		gridApi?.paginationGoToPage(page);
	}, [gridApi]);

	const onPageSizeChange = useCallback((size: number) => {
		gridApi?.setGridOption('paginationPageSize', size);
	}, [gridApi]);

	// Gestion de la hauteur minimale pour la zone vide
	useEffect(() => {
		if (!containerRef.current) return;

		const floatingBottom = containerRef.current.querySelector('.ag-floating-bottom');
		if (floatingBottom instanceof HTMLElement) {
			const hasData = paginationState.totalRows > 0;
			floatingBottom.style.minHeight = hasData ? '0' : `${emptyRowsHeight}`;
		}
	}, [emptyRowsHeight, gridApi, rowData, datasource, paginationState.totalRows]);

	return (
		<div className={wrapperClass} style={{ width: '100%' }} ref={containerRef}>
			<div className="datagrid__container">
				<AgGridReact
					theme="legacy"
					rowData={rowModelType === 'infinite' ? undefined : (rowData || [])}
					columnDefs={processedColumnDefs}
					domLayout="autoHeight"
					pagination={pagination}
					paginationPageSize={paginationState.pageSize}
					suppressPaginationPanel={true}
					onPaginationChanged={onPaginationChanged}
					rowModelType={rowModelType}
					datasource={datasource}
					cacheBlockSize={cacheBlockSize}
					maxBlocksInCache={maxBlocksInCache}
					onGridReady={handleGridReady}
					localeText={localeText}
					rowClassRules={rowClassRules}
					icons={icons ? icons :
						{
							sortUnSort: '<i class="icon-list-filter"></i>'
						}
					}
					rowSelection={selectable ? {
						mode: 'multiRow',
						headerCheckbox: true,
						checkboxes: true,
						enableSelectionWithoutKeys: true,
						enableClickSelection: false
					} as any : undefined}
					selectionColumnDef={selectable ? {
						pinned: 'left',
						width: 40,
						minWidth: 40,
						maxWidth: 40,
						headerClass: 'table-cell--center',
						cellClass: 'table-cell--center',
						suppressHeaderMenu: true,
						suppressHeaderFilter: true,
						resizable: false,
						...selectionColumnDef
					} : undefined}
					suppressMovableColumns={true}
					suppressMenuHide={true}
					rowHeight={rowHeight}
					getRowHeight={getRowHeight}
					defaultColDef={{
						flex: 1,
						resizable: resizable,
						sortable: sortable,
						unSortIcon: sortable,
					}}
				/>
			</div>
			{pagination && (
				<TablePagination
					currentPage={paginationState.currentPage}
					totalPages={paginationState.totalPages}
					pageSize={paginationState.pageSize}
					totalRows={paginationState.totalRows}
					pageSizeOptions={pageSizeOptions}
					onPageChange={onPageChange}
					onPageSizeChange={onPageSizeChange}
					localeText={localeText}
				/>
			)}
		</div>
	);
};

// Exporter les types pour utilisation externe
export type { RowData, ColumnDef, TableOptions };
