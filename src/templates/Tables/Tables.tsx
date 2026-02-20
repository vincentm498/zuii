import { useState, useEffect, useMemo, useCallback } from 'react';
import { Table, Button, Group, Icon, Form, } from '../../index';
import {
	columnsSimple, dataSimple,
	columnsAdvanced, dataAdvanced,
	columnsStatus, dataStatus,
	columnsInfinite, rowClassRules
} from './tables.data';

/**
 * Template de démonstration pour le composant Table.
 */
export const Tables = () => {
	// État pour stocker l'API Grid de l'exemple infini
	const [gridApi, setGridApi] = useState<any>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [tempSearch, setTempSearch] = useState('');

	// Exemple de pagination serveur (DummyJSON avec Limit / Skip)
	const infiniteDatasource = useMemo(() => ({
		getRows: (params: any) => {
			const limit = params.endRow - params.startRow;
			const skip = params.startRow;

			// Gestion du tri (DummyJSON: sortBy & order)
			let sortQuery = '';
			if (params.sortModel && params.sortModel.length > 0) {
				const { colId, sort } = params.sortModel[0];
				sortQuery = `&sortBy=${colId}&order=${sort}`;
			}

			// Si on a un terme de recherche (soumis), on utilise l'endpoint de recherche
			const baseUrl = searchTerm
				? `https://dummyjson.com/users/search?q=${searchTerm}&`
				: `https://dummyjson.com/users?`;

			fetch(`${baseUrl}limit=${limit}&skip=${skip}${sortQuery}`)
				.then(response => response.json())
				.then(data => {
					const formattedData = data.users.map((user: any) => ({
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						age: user.age,
						company: user.company.name
					}));
					params.successCallback(formattedData, data.total);
				})
				.catch(error => {
					console.error('Erreur DummyJSON:', error);
					params.failCallback();
				});
		}
	}), [searchTerm]);

	// Exemple de datasource vide
	const emptyDatasource = useMemo(() => ({
		getRows: (params: any) => {
			params.successCallback([], 0);
		}
	}), []);


	// Déclencher un rafraîchissement quand la recherche VALIDÉE change
	useEffect(() => {
		if (gridApi) {
			gridApi.purgeInfiniteCache();
		}
	}, [searchTerm, gridApi]);

	const onSearch = useCallback((e: React.FormEvent) => {
		e.preventDefault();
		setSearchTerm(tempSearch);
	}, [tempSearch]);

	const onRefresh = useCallback(() => {
		if (gridApi) {
			gridApi.purgeInfiniteCache();
		}
	}, [gridApi]);

	return (
		<div className="Tables-demo">
			<section className="mb-5">
				<h3>Tables</h3>
				<p className="text-muted mb-4">Le composant <code>Table</code> permet d'afficher et de manipuler des données complexes avec support du tri, de la pagination et du chargement infini.</p>

				<h5 className='mt-4'>Exemple Simple</h5>
				<Table rowData={dataSimple} columnDefs={columnsSimple} />

				<h5 className='mt-5'>Sélection Multi-lignes</h5>
				<Table rowData={dataSimple} columnDefs={columnsSimple} selectable={true} />

				<h5 className='mt-5'>Avancé : Actions, Pagination et Redimensionnement</h5>
				<Table rowData={dataAdvanced} columnDefs={columnsAdvanced} selectable={true} resizable={true} pagination />

				<h5 className='mt-5'>Pagination avec Options Personnalisées</h5>
				<p className="text-muted mb-4">Exemple avec des options de taille de page personnalisées : 2, 5, 15, 25, 50</p>
				<Table
					rowData={dataAdvanced}
					columnDefs={columnsAdvanced}
					pagination
					paginationPageSize={2}
					pageSizeOptions={[2, 5, 15, 25, 50]}
				/>

				<h5 className='mt-5'>Gestion des Statuts (Badges & Styles de lignes)</h5>
				<Table rowData={dataStatus} columnDefs={columnsStatus} rowClassRules={rowClassRules} resizable rowHeight={50}/>

				<h5 className='mt-5'>Chargement Infini (DummyJSON)</h5>
				<p className="text-muted mb-4">Récupère les données au fur et à mesure du défilement ou de la pagination. Supporte aussi la recherche et le tri serveur.</p>

				<div className="mb-3">
					<Form onSubmit={onSearch}>
						<Group gap="md" center>
							<Form.Control
								type="text"
								placeholder="Rechercher un utilisateur (ex: John)..."
								value={tempSearch}
								onChange={(e) => setTempSearch(e.target.value)}
							/>
							<Button type="submit" variant="primary">Rechercher</Button>
							<Button onClick={onRefresh} variant="light" btnIcon>
								<Icon name="icon-refresh-cw" />
							</Button>
						</Group>
					</Form>
				</div>

				<Table
					columnDefs={columnsInfinite}
					rowModelType="infinite"
					datasource={infiniteDatasource}
					pagination={true}
					paginationPageSize={20}
					cacheBlockSize={20}
					onGridReady={(params) => setGridApi(params.api)}
					sortable
				/>
				<h5 className='mt-5'>Exemple sans données (Simple)</h5>
				<Table rowData={[]} columnDefs={columnsSimple} />

				<h5 className='mt-5'>Exemple sans données (Infini avec minHeight)</h5>
				<Table
					columnDefs={columnsInfinite}
					rowModelType="infinite"
					datasource={emptyDatasource}
					pagination={true}
					paginationPageSize={20}
					cacheBlockSize={20}
					sortable

				/>


			</section>
		</div>
	);
};
