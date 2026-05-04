import { Button } from '../../Button/react';
import { Icon } from '../../Icon/react';
import { Select } from '../../Form/react/Select';
import { Group } from '../../Group/react';
import { Tooltip } from '../../Tooltip/react';

interface Props {
	/**
	 * Page actuelle (0-indexed).
	 */
	currentPage: number;
	/**
	 * Nombre total de pages.
	 */
	totalPages: number;
	/**
	 * Nombre de lignes par page.
	 */
	pageSize: number;
	/**
	 * Nombre total de lignes dans le tableau.
	 */
	totalRows: number;
	/**
	 * Options de taille de page (par défaut: [10, 20, 50, 100]).
	 */
	pageSizeOptions?: number[];
	/**
	 * Callback lors du changement de page.
	 * @param page La nouvelle page (0-indexed).
	 */
	onPageChange: (page: number) => void;
	/**
	 * Callback lors du changement de taille de page.
	 * @param size La nouvelle taille.
	 */
	onPageSizeChange: (size: number) => void;
	/**
	 * Objet contenant les textes traduits d'Ag-Grid.
	 */
	localeText?: any;
}

/**
 * Composant de pagination pour le tableau.
 */
export const TablePagination = ({
	currentPage,
	totalPages,
	pageSize,
	totalRows,
	pageSizeOptions = [10, 20, 50, 100],
	onPageChange,
	onPageSizeChange,
	localeText = {},
}: Props) => {
	const startRow = totalRows === 0 ? 0 : currentPage * pageSize + 1;
	const endRow = Math.min((currentPage + 1) * pageSize, totalRows);

	// Extraction des labels directement depuis l'objet localeText d'Ag-Grid
	const {
		pageSizeSelectorLabel: pageSizeLabel,
		of: rangeSeparator,
		noRowsToShow: noDataLabel,
		firstPage: firstPageLabel,
		previousPage: prevPageLabel,
		nextPage: nextPageLabel,
		lastPage: lastPageLabel,
	} = localeText;

	const options = pageSizeOptions.map(size => ({
		text: size.toString(),
		value: size.toString(),
	}));

	return (
		<div className="datagrid__pagination">
			<div className="datagrid__pagination-wrapper">
				<span className="datagrid__pagination-label">{pageSizeLabel}</span>
				<Select
					options={options}
					value={pageSize.toString()}
					onChange={(val) => onPageSizeChange(Number(val))}
					className="datagrid__pagination-select"
					searchable={false}
				/>
			</div>

			<div className="datagrid__pagination-status">
				{totalRows > 0 ? (
					<>
						<strong>{startRow}</strong> – <strong>{endRow}</strong> {rangeSeparator} <strong>{totalRows}</strong>
					</>
				) : (
					noDataLabel
				)}
			</div>

			<Group gap="xs" className="datagrid__pagination-nav">
				<Tooltip content={firstPageLabel}>
					<Button
						variant="light"
						btnIcon
						onClick={() => onPageChange(0)}
						disabled={currentPage === 0}
						title={firstPageLabel}
					>
						<Icon name="icon-chevrons-left" />
					</Button>
				</Tooltip>
				<Tooltip content={prevPageLabel}>
					<Button
						variant="light"
						btnIcon
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 0}
						title={prevPageLabel}
					>
						<Icon name="icon-chevron-left" />
					</Button>
				</Tooltip>
				<Tooltip content={nextPageLabel}>
					<Button
						variant="light"
						btnIcon
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage >= totalPages - 1}
						title={nextPageLabel}
					>
						<Icon name="icon-chevron-right" />
					</Button>
				</Tooltip>
				<Tooltip content={lastPageLabel}>
					<Button
						variant="light"
						btnIcon
						onClick={() => onPageChange(totalPages - 1)}
						disabled={currentPage >= totalPages - 1}
						title={lastPageLabel}
					>
						<Icon name="icon-chevrons-right" />
					</Button>
				</Tooltip>
			</Group>
		</div>
	);
};
