import { ContextMenu } from '../../index';

/**
 * Template de démonstration pour le composant ContextMenu.
 * @returns {JSX.Element} La page de démo des menus contextuels.
 */
export const ContextMenus = () => {
	/**
	 * Gère les actions du menu.
	 * @param {string} action - L'identifiant de l'action.
	 */
	const handleAction = (action: string) => {
		alert(`Action exécutée : ${action}`);
	};

	return (
		<div>
			<section className='p-4'>
				<h3>Menu Contextuel Classique</h3>
				<p>Faites un clic droit sur la zone ci-dessous pour ouvrir le menu.</p>

				<ContextMenu onAction={handleAction} className='pt-4'>
					<div style={{ padding: '1.5rem', border: '1px dashed #595959ff', borderRadius: '4px', width: 'fit-content' }}>
						Zone interactive (Clic droit ici)
					</div>
				</ContextMenu>
			</section>


			<section className='p-4'>
				<h3>Utilisation de données personnalisées</h3>
				<p>Passage d'un tableau d'items spécifique avec gestion globale via `onAction`.</p>

				<div style={{ height: '150px', overflow: 'auto' }}>
					ici
					<ContextMenu
						className='pt-4'
						onAction={handleAction}
						items={[
							{ label: "Voir les propriétés", action: "props" },
							{ label: "Supprimer", action: "delete", disabled: true },
							{ type: "separator", label: "" },
							{ label: "Renommer", action: "rename" },
							{ label: "Dupliquer", action: "duplicate" }
						]}
					>
						<div style={{ padding: '1.5rem', border: '1px dashed #595959ff', borderRadius: '4px', width: 'fit-content' }}>
							Élément avec items spécifiques (Callback global)
						</div>
					</ContextMenu>
				</div>
			</section>

			<section className='p-4'>
				<h3>Actions individuelles par item</h3>
				<p>Chaque item peut avoir sa propre fonction de rappel `onAction`.</p>
				<ContextMenu
					className='pt-4'
					items={[
						{
							label: "Action Directe 1",
							onAction: () => alert("Action 1 exécutée directement !")
						},
						{
							label: "Action Directe 2",
							onAction: () => console.log("Action 2 via console")
						},
						{ type: "separator", label: "" },
						{
							label: "Ouvrir Google",
							onAction: () => window.open("https://google.com", "_blank")
						}
					]}
				>
					<div style={{ padding: '1.5rem', border: '1px dashed #595959ff', borderRadius: '4px' , width: 'fit-content' }}>
						Callbacks individuels
					</div>
				</ContextMenu>
			</section>
		</div>
	);
};
