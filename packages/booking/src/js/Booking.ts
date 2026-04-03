import { format } from 'date-fns';
import { fr as localeFr, enUS as localeEn } from 'date-fns/locale';
import { Calendar, type CalendarOptions } from '@zuii/calendar';
import { Modal } from '@zuii/modal';


const trads: any = {
	fr: {
		selectSlot: 'Vous avez sélectionné le',
		noSlots: 'Pas de créneaux disponibles pour cette date.',
		selectDay: 'Sélectionnez un jour dans le calendrier',
		selectTime: 'Sélectionner un horaire pour le',
		selectGeneralSlot: 'Sélectionner un créneau pour le',
		confirmTitle: 'Confirmer la réservation',
		confirmBody: 'Vous avez sélectionné le <strong>{date}</strong> {prep} <strong>{slot}</strong>.',
		confirmBtn: 'Réserver ce créneau',
		cancelBtn: 'Annuler'
	},
	en: {
		selectSlot: 'You have selected',
		noSlots: 'No slots available for this date.',
		selectDay: 'Please select a day in the calendar',
		selectTime: 'Select a time slot for',
		selectGeneralSlot: 'Select a slot for',
		confirmTitle: 'Confirm Booking',
		confirmBody: 'You selected <strong>{date}</strong> {prep} <strong>{slot}</strong>.',
		confirmBtn: 'Book this slot',
		cancelBtn: 'Cancel'
	}
};

export interface BookingField {
	name: string;
	label: string;
	type: 'text' | 'email' | 'tel' | 'textarea' | 'number' | 'date' | 'checkbox' | 'quantity';
	required?: boolean;
	placeholder?: string;
	value?: string | number | boolean;
	min?: number | string;
	max?: number | string;
	step?: number | string;
}

export interface BookingOptions extends Omit<CalendarOptions, 'onDateSelect'> {
	lang?: 'fr' | 'en';
	availability: Record<string, string[]>;
	selectedDate?: Date | null;
	inputName?: string;
	fields?: BookingField[];
	labels?: Record<string, string>;
	itemTitle?: string;
	onSlotSelect?: (date: Date, slot: string, formData: Record<string, any>) => void;
}

/**
 * Composant Réservation (Booking) Vanilla JS.
 * Englobe le calendrier et la sélection de créneaux.
 */
export class Booking {
	private container: HTMLElement;
	private calendarContainer: HTMLElement | null = null;
	private slotsContainer: HTMLElement | null = null;
	private calendarInstance: Calendar | null = null;
	private selectedDate: Date | null = null;
	private selectedSlot: string | null = null;
	private options: Required<BookingOptions>;
	private currentTrads: any;

	/**
	 * @param {HTMLElement} container - Élément DOM où injecter le booking.
	 * @param {BookingOptions} options - Options de configuration.
	 */
	constructor(container: HTMLElement, options: BookingOptions) {
		this.container = container;
		this.options = {
			lang: 'fr',
			selectedDate: null,
			inputName: 'booking_datetime',
			onSlotSelect: () => {},
			mode: 'single',
			disablePast: false,
			onRangeSelect: () => {},
			initialDate: new Date(),
			labels: {},
			itemTitle: '',
			...options
		} as Required<BookingOptions>;

		if (!this.options.fields) {
			this.options.fields = [
				{ name: 'firstname', label: this.options.lang === 'en' ? 'Firstname' : 'Prénom', type: 'text', required: true },
				{ name: 'lastname', label: this.options.lang === 'en' ? 'Lastname' : 'Nom', type: 'text', required: true },
				{ name: 'email', label: 'Email', type: 'email', required: true }
			];
		}


		this.selectedDate = this.options.selectedDate;
		this.currentTrads = { ...trads[this.options.lang], ...this.options.labels };
		this.initLayout();
		this.render();
	}

	/**
	 * Initialise la structure de base (deux colonnes).
	 */
	private initLayout(): void {
		this.container.innerHTML = `
			<div class="booking-wrapper">
				<div class="booking__calendar-column"></div>
				<div class="booking__slots-column"></div>
			</div>
		`;
		this.calendarContainer = this.container.querySelector('.booking__calendar-column');
		this.slotsContainer = this.container.querySelector('.booking__slots-column');

		if (this.calendarContainer) {
			this.calendarInstance = new Calendar(this.calendarContainer, {
				lang: this.options.lang,
				mode: this.options.mode,
				disablePast: this.options.disablePast,
				availability: this.options.availability,
				initialDate: this.options.initialDate,
				onDateSelect: (date: Date) => {
					this.updateDate(date);
				}
			});
		}
	}

	/**
	 * Met à jour la date sélectionnée.
	 * @param {Date} date - La nouvelle date sélectionnée.
	 */
	public updateDate(date: Date): void {
		this.selectedDate = date;
		this.selectedSlot = null;
		this.render();
	}

	/**
	 * Change la langue du composant.
	 * @param {string} lang - 'fr' ou 'en'.
	 */
	public setLanguage(lang: 'fr' | 'en'): void {
		this.options.lang = lang;
		this.currentTrads = trads[lang];
		if (this.calendarInstance) {
			this.calendarInstance.setLanguage(lang);
		}
		this.render();
	}

	/**
	 * Rendu HTML de la partie créneaux (booking).
	 */
	private render(): void {
		if (!this.slotsContainer) return;

		if (!this.selectedDate) {
			this.slotsContainer.innerHTML = `
				<div class="booking--empty">
					<div class="booking__empty-message">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
						<p>${this.currentTrads.selectDay}</p>
					</div>
				</div>
			`;
			return;
		}

		const dateStr = format(this.selectedDate, 'yyyy-MM-dd');
		const slots = this.options.availability[dateStr] || [];
		const locale = this.options.lang === 'fr' ? localeFr : localeEn;
		const formattedDate = format(this.selectedDate, 'EEEE d MMMM yyyy', { locale });

		const isTimeSlot = slots.some(slot => slot.includes(':') || /\\d[h:]/i.test(slot));
		const titleLabel = slots.length > 0 && !isTimeSlot ? this.currentTrads.selectGeneralSlot : this.currentTrads.selectTime;

		this.slotsContainer.innerHTML = `
			<div class="booking">
				<h3 class="booking__title">${titleLabel} ${formattedDate}</h3>
				<div class="booking__slots">
					${slots.map(slot => `
						<button class="btn btn-primary booking__slot ${this.selectedSlot === slot ? 'booking__slot--selected' : ''}" data-slot="${slot}">
							<span class="btn-content booking__slot__label">${slot.includes(':') ? slot.replace(':', 'h') : slot}</span>
						</button>
					`).join('')}
					${slots.length === 0 ? `<p class="booking__empty">${this.currentTrads.noSlots}</p>` : ''}
				</div>

				<input type="hidden" name="${this.options.inputName}[date]" value="${this.selectedSlot ? dateStr : ''}" />
				<input type="hidden" name="${this.options.inputName}[slot]" value="${this.selectedSlot || ''}" />
			</div>
		`;

		this.bindEvents();
	}

	/**
	 * Attache les événements DOM.
	 */
	private bindEvents(): void {
		if (!this.slotsContainer) return;

		const slotBtns = this.slotsContainer.querySelectorAll('.booking__slot');
		slotBtns.forEach(btn => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				const slot = btn.getAttribute('data-slot');
				if (slot && this.selectedDate) {
					this.openConfirmationModal(this.selectedDate, slot);
				}
			});
		});
	}

	/**
	 * Ouvre la modale de confirmation pour un créneau donné.
	 * @param {Date} date - La date sélectionnée.
	 * @param {string} slot - Le créneau horaire.
	 */
	private openConfirmationModal(date: Date, slot: string): void {
		const locale = this.options.lang === 'fr' ? localeFr : localeEn;
		const formattedDate = format(date, 'EEEE d MMMM yyyy', { locale });
		const displaySlot = slot.includes(':') ? slot.replace(':', 'h') : slot;

		const prep = this.options.lang === 'fr' ? (slot.includes(':') ? 'à' : 'au') : (slot.includes(':') ? 'at' : 'on');
		const body = `
			<p class="booking-modal__text">${this.currentTrads.confirmBody
				.replace('{title}', this.options.itemTitle)
				.replace('{date}', formattedDate)
				.replace('{slot}', displaySlot)
				.replace('{prep}', prep)}</p>
			<form id="booking-confirmation-form" class="form booking-form">
				${this.options.fields.map(field => {
					const inputType = field.type === 'quantity' ? 'number' : field.type;
					const inputClass = field.type === 'checkbox' ? 'form-check-input' : 'form-control';
					const valAttr = field.value !== undefined ? ` value="${field.value}"` : '';
					const minAttr = field.min !== undefined ? ` min="${field.min}"` : '';
					const maxAttr = field.max !== undefined ? ` max="${field.max}"` : '';
					const stepAttr = field.step !== undefined ? ` step="${field.step}"` : '';
					const reqAttr = field.required ? ' required' : '';
					const placeholderAttr = field.placeholder ? ` placeholder="${field.placeholder}"` : '';

					return `
					<div class="form__group booking-form-group booking-form-group--${field.name}">
						<label for="field-${field.name}" class="form-label">
							${field.label}${field.required ? ' <span class="text-danger">*</span>' : ''}
						</label>
						<div class="form__input ${field.type === 'checkbox' ? 'form-check' : ''}">
							${field.type === 'textarea' ? `
								<textarea
									id="field-${field.name}"
									name="${field.name}"
									class="${inputClass}"${reqAttr}${placeholderAttr}${valAttr}
								></textarea>
							` : `
								<input
									type="${inputType}"
									id="field-${field.name}"
									name="${field.name}"
									class="${inputClass}"${reqAttr}${placeholderAttr}${valAttr}${minAttr}${maxAttr}${stepAttr}
								/>
							`}
						</div>
					</div>
					`;
				}).join('')}
			</form>
		`;

		const footer = `
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
				${this.currentTrads.cancelBtn}
			</button>
			<button type="submit" form="booking-confirmation-form" class="btn btn-primary" id="confirm-booking-btn">
				${this.currentTrads.confirmBtn}
			</button>
		`;

		const modal = Modal.open({
			title: this.currentTrads.confirmTitle,
			body: body,
			footer: footer,
			centered: true
		});

		// Gérer la soumission du formulaire
		setTimeout(() => {
			const form = document.getElementById('booking-confirmation-form') as HTMLFormElement;
			if (form) {
				form.addEventListener('submit', (e) => {
					e.preventDefault();

					const formDataRaw = new FormData(form);
					const formData: Record<string, any> = {};
					formDataRaw.forEach((value, key) => {
						formData[key] = value;
					});

					this.selectedSlot = slot;
					this.render();
					modal.hide();

					if (this.options.onSlotSelect) {
						this.options.onSlotSelect(date, slot, formData);
					}
				});
			}
		}, 0);
	}
}
