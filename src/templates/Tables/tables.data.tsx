import { Group, Button, Icon, Badge } from '../../index';

/**
 * Renderer pour les actions dans le tableau.
 */
export const ActionsRenderer = () => {
	return (
		<Group ariaLabel='Group actions' gap='none' center align='center'>
			<Button variant="primary" btnIcon={true} transparent onClick={() => alert('Modifier')}>
				<Icon size="sm" name="icon-pencil" />
			</Button>
			<Button variant="danger" btnIcon={true} transparent onClick={() => alert('Chrono')}>
				<Icon size="sm" name="icon-timer" />
			</Button>
			<Button variant="danger" btnIcon={true} transparent onClick={() => alert('Params')}>
				<Icon size="sm" name="icon-cog" />
			</Button>
			<Button variant="danger" btnIcon={true} transparent onClick={() => alert('Supprimer')}>
				<Icon size="sm" name="icon-trash" className='text-danger' />
			</Button>
		</Group>
	);
};

/**
 * Renderer pour le statut avec des badges.
 */
export const StatusRenderer = (params: any) => {
	const status = params.value;
	let variant: any = "light";

	switch (status) {
		case 'Terminé': variant = "primary"; break;
		case 'Atente': variant = "primary"; break;
		case 'En cours': variant = "light"; break;
		case 'Annulé': variant = "primary"; break;
		case 'Dernier': variant = "primary"; break;
	}

	return <Badge variant={variant} size="sm" outline >{status}</Badge>;
};

/**
 * Règles de style pour les lignes basées sur le statut.
 */
export const rowClassRules = {
	'table-row--success': (params: any) => params.data.status === 'Terminé',
	'table-row--danger-light': (params: any) => params.data.status === 'Atente',
	'table-row--danger': (params: any) => params.data.status === 'En cours',
	'table-row--accent-light': (params: any) => params.data.status === 'Annulé',
	'table-row--warning': (params: any) => params.data.status === 'Dernier',
};

// --- Exemple 1 : Simple ---
export const columnsSimple = [
	{ field: 'id', headerName: 'ID', headerClass: 'table-id table-cell--center', cellClass: 'table-cell--center', width: 60, maxWidth: 60, minWidth: 60, flex: 0, suppressSizeToFit: true },
	{ field: 'make', headerName: 'Constructeur' },
	{ field: 'model', headerName: 'Modèle' },
	{ field: 'price', headerName: 'Prix' }
];

export const dataSimple = [
	{ id: 1, make: 'Toyota', model: 'Celica', price: 35000 },
	{ id: 2, make: 'Ford', model: 'Mondeo', price: 32000 },
	{ id: 3, make: 'Porsche', model: 'Boxster', price: 72000 }
];

// --- Exemple 2 : Avancé avec Actions ---
export const columnsAdvanced = [
	{ field: 'number', headerName: 'N°', headerClass: 'table-id table-cell--center', cellClass: 'table-cell--center', width: 40, maxWidth: 40, minWidth: 40, flex: 0, suppressSizeToFit: true },
	{ field: 'name', headerName: 'Nom', headerClass: 'table-cell--center', minWidth: 200, editable: true },
	{ field: 'step', headerName: 'Étape', headerClass: 'table-number table-cell--center', cellClass: 'table-cell--center' },
	{ field: 'rounds', headerName: 'Manches', headerClass: 'table-rounds table-cell--center', cellClass: 'table-cell--center' },
	{ field: 'scoring', headerName: 'Barème', cellClass: 'table-cell--center', headerClass: 'table-cell--center' },
	{ field: 'phase', headerName: 'Phase', headerClass: 'table-phase table-cell--center', cellClass: 'table-cell--center' },
	{ field: 'nb_engaged', headerName: 'Nb Engagés', headerClass: 'table-nb_engaged table-cell--center', cellClass: 'table-cell--center' },
	{ field: 'date', headerName: 'Date', minWidth: 100, headerClass: 'table-cell--center', cellClass: 'table-cell--right' },
	{ field: 'actions', headerName: 'Actions', minWidth: 112, cellRenderer: ActionsRenderer, headerClass: 'table-cell--center', sortable: false, resizable: false }
];

export const dataAdvanced = [
	{ number: 1, name: 'Championnat Régional', step: 4, rounds: 2, scoring: 'A', phase: '1', nb_engaged: 45, date: '2024-03-15' },
	{ number: 2, name: 'Grand Prix National', step: 8, rounds: 1, scoring: 'A', phase: '2', nb_engaged: 28, date: '2024-03-20' },
	{ number: 3, name: 'Critérium Espoirs', step: 1, rounds: 3, scoring: 'S', phase: '1', nb_engaged: 62, date: '2024-04-05' },
	{ number: 4, name: 'Coupe des Clubs', step: 2, rounds: 2, scoring: 'C', phase: '3', nb_engaged: 110, date: '2024-04-12' },
	{ number: 5, name: 'Tournoi d\'Automne', step: 1, rounds: 1, scoring: 'A', phase: '1', nb_engaged: 35, date: '2024-10-10' },
	{ number: 6, name: 'Master Pro', step: 4, rounds: 2, scoring: 'A', phase: '2', nb_engaged: 20, date: '2024-11-25' },
	{ number: 7, name: 'Challenge Hivernal', step: 2, rounds: 2, scoring: 'S', phase: '1', nb_engaged: 55, date: '2024-12-05' },
	{ number: 8, name: 'Challenge Hivernal', step: 2, rounds: 2, scoring: 'S', phase: '1', nb_engaged: 55, date: '2024-12-05' },
	{ number: 9, name: 'Challenge Hivernal', step: 2, rounds: 2, scoring: 'S', phase: '1', nb_engaged: 55, date: '2024-12-05' },
	{ number: 10, name: 'Challenge Hivernal', step: 2, rounds: 2, scoring: 'S', phase: '1', nb_engaged: 55, date: '2024-12-05' },
	{ number: 11, name: 'Challenge Hivernal', step: 2, rounds: 2, scoring: 'S', phase: '1', nb_engaged: 55, date: '2024-12-05' },
	{ number: 12, name: 'Challenge Hivernal', step: 2, rounds: 2, scoring: 'S', phase: '1', nb_engaged: 55, date: '2024-12-05' },
	{ number: 13, name: 'Challenge Hivernal', step: 2, rounds: 2, scoring: 'S', phase: '1', nb_engaged: 55, date: '2024-12-05' },
	{ number: 14, name: 'Challenge Hivernal', step: 2, rounds: 2, scoring: 'S', phase: '1', nb_engaged: 55, date: '2024-12-05' },
	{ number: 15, name: 'Challenge Hivernal', step: 2, rounds: 2, scoring: 'S', phase: '1', nb_engaged: 55, date: '2024-12-05' },
];

// --- Exemple 3 : Statuts et Getters ---
export const columnsStatus = [
	{ headerName: 'Statut', field: 'status', headerClass: 'table-status table-cell--center', cellClass: 'table-cell--center', cellRenderer: StatusRenderer, resizable: false, width: 70, maxWidth: 70, minWidth: 70, flex: 0, suppressSizeToFit: true },
	{ headerName: 'N°', field: 'number', headerClass: 'table-number table-cell--center', cellClass: 'table-cell--center', width: 40, maxWidth: 40, minWidth: 40, flex: 0, suppressSizeToFit: true },
	{ headerName: 'Dossard', field: 'dossard', headerClass: 'table-dossard table-cell--center', cellClass: 'table-cell--center', width: 80, maxWidth: 80, minWidth: 40, flex: 0, suppressSizeToFit: true },
	{ headerName: 'N° Equi', field: 'numberTeam', headerClass: 'table-numberTeam table-cell--center', cellClass: 'table-cell--center', width: 80, maxWidth: 80, minWidth: 40, flex: 0, suppressSizeToFit: true },
	{ headerName: 'Rider', field: 'rider', headerClass: 'table-rider table-cell--center', cellClass: 'table-cell--align-center' },
	{ headerName: 'Cheval', field: 'horse', headerClass: 'table-horse table-cell--center', cellClass: 'table-cell--align-center' },
	{ headerName: 'Club', field: 'team', headerClass: 'table-team table-cell--center', cellClass: 'table-cell--align-center' },
	{ headerName: 'Phase 1', field: 'step_1', headerClass: 'table-step_1 table-cell--center', cellClass: 'table-cell--right table-cell--align-center', valueGetter: (params: any) => params.data.step_1 ? `${params.data.step_1.time}s (${params.data.step_1.pts} pts)` : '' },
	{ headerName: 'Phase 2', field: 'step_2', headerClass: 'table-step_2 table-cell--center', cellClass: 'table-cell--right table-cell--align-center', valueGetter: (params: any) => params.data.step_2 ? `${params.data.step_2.time}s (${params.data.step_2.pts} pts)` : '' },
	{
		headerName: 'Total',
		field: 'total',
		headerClass: 'table-total table-cell--center',
		cellClass: 'table-cell--right table-cell--align-center',
		valueGetter: (params: any) => {
			const s1 = params.data.step_1;
			const s2 = params.data.step_2;
			if (!s1 && !s2) return '';
			const totalTime = ((s1?.time || 0) + (s2?.time || 0)).toFixed(2);
			const totalPts = (s1?.pts || 0) + (s2?.pts || 0);
			return `${totalTime}s (${totalPts} pts)`;
		}
	},
];

export const dataStatus = [
	{ status: 'Terminé', number: 25, dossard: 12, numberTeam: 155, rider: 'Elene Mininosvili', horse: 'Talwood du Clocher', team: 'Écurie de cé', step_1: { time: 2.21, pts: 1, }, step_2: { time: 2.21, pts: 1, } },
	{ status: 'En cours', number: 26, dossard: 14, numberTeam: 156, rider: 'Jean Dupont', horse: 'Eclair', team: 'Haras des Pins', step_1: { time: 45.5, pts: 0, }, step_2: { time: 0, pts: 0, } },
	{ status: 'Atente', number: 27, dossard: 15, numberTeam: 157, rider: 'Marie Curie', horse: 'Radieux', team: 'Club Hippique', step_1: { time: 0, pts: 0, }, step_2: { time: 0, pts: 0, } },
	{ status: 'Annulé', number: 28, dossard: 16, numberTeam: 158, rider: 'Paul Laporte', horse: 'Foudre', team: 'Écurie du Sud', step_1: { time: 0, pts: 0, }, step_2: { time: 0, pts: 0, } },
	{ status: 'Dernier', number: 24, dossard: 10, numberTeam: 150, rider: 'Marc Voisin', horse: 'Tonnerre', team: 'Écurie de l\'Est', step_1: { time: 2.50, pts: 4, }, step_2: { time: 3.10, pts: 0, } },
	{ status: '', number: 55, dossard: 45, numberTeam: 12, rider: 'Lucie Bernard', horse: 'Galaxie', team: 'Écurie du Roy', step_1: { time: 1.15, pts: 0, }, step_2: { time: 2.05, pts: 0, } }
];

// --- Exemple 4 : Infini ---
export const columnsInfinite = [
	{ field: 'id', headerName: 'ID', width: 70, maxWidth: 70 },
	{ field: 'firstName', headerName: 'Prénom' },
	{ field: 'lastName', headerName: 'Nom' },
	{ field: 'email', headerName: 'Email', minWidth: 200 },
	{ field: 'age', headerName: 'Âge', width: 80 },
	{ field: 'company', headerName: 'Entreprise' }
];
