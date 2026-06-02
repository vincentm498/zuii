import { Modal as BSModal } from 'bootstrap';

/**
 * Interface pour les options de la modale.
 */
export interface ModalOptions {
	title?: string;
	body?: string;
	footer?: string;
	size?: 'sm' | 'lg' | 'xl';
	centered?: boolean;
}

/**
 * Composant Modal Vanilla JS.
 * Utilise Bootstrap 5 en interne.
 */
export class Modal {
	private element: HTMLElement | null = null;
	private instance: BSModal | null = null;

	/**
	 * Ouvre une modale de manière statique.
	 * @param {ModalOptions} options - Options de configuration.
	 * @returns {Modal} Instance de la modale.
	 */
	public static open(options: ModalOptions): Modal {
		const modal = new Modal();
		modal.create(options);
		modal.show();
		return modal;
	}

	/**
	 * Crée la structure HTML de la modale.
	 * @param {ModalOptions} options - Les options de rendu.
	 */
	private create(options: ModalOptions): void {
		const id = `modal-${Math.random().toString(36).substr(2, 9)}`;
		const html = `
			<div class="modal fade" id="${id}" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog ${options.size ? `modal-${options.size}` : ''} ${options.centered ? 'modal-dialog-centered' : ''}">
					<div class="modal-content">
						${options.title ? `
							<div class="modal-header">
								<h5 class="modal-title">${options.title}</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
						` : ''}
						<div class="modal-body">
							${options.body || ''}
						</div>
						${options.footer ? `
							<div class="modal-footer">
								${options.footer}
							</div>
						` : ''}
					</div>
				</div>
			</div>
		`;

		document.body.insertAdjacentHTML('beforeend', html);
		this.element = document.getElementById(id);

		if (this.element) {
			this.instance = new BSModal(this.element);

			// Nettoyage automatique du DOM à la fermeture
			this.element.addEventListener('hidden.bs.modal', () => {
				this.destroy();
			});
		}
	}

	/**
	 * Affiche la modale.
	 */
	public show(): void {
		this.instance?.show();
	}

	/**
	 * Ferme la modale.
	 */
	public hide(): void {
		this.instance?.hide();
	}

	/**
	 * Détruit la modale et la retire du DOM.
	 */
	public destroy(): void {
		if (this.element) {
			this.element.remove();
			this.element = null;
			this.instance = null;
		}
	}
}

/**
 * Logique d'initialisation par défaut.
 */
export const initModal = () => {
	console.log('Zuii Modal initialized');
};
