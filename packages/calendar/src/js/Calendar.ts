import {
	format,
	addMonths,
	subMonths,
	startOfMonth,
	startOfWeek,
	eachDayOfInterval,
	isSameMonth,
	isSameDay,
	startOfDay,
	addDays,
} from 'date-fns';
import { fr, en } from '../trads/i18n';
import { initSelect } from '../../../../src/components/Form/js/select';

export interface CalendarOptions {
	lang?: 'fr' | 'en';
	mode?: 'single' | 'range';
	disablePast?: boolean;
	availability?: Record<string, string[]>;
	onDateSelect?: (date: Date) => void;
	onRangeSelect?: (start: Date, end: Date) => void;
	initialDate?: Date;
}

/**
 * Composant Calendrier Vanilla JS.
 */
export class Calendar {
	private container: HTMLElement;
	private currentMonth: Date;
	private selectedDate: Date | null = null;
	private startDate: Date | null = null;
	private endDate: Date | null = null;
	private options: Required<CalendarOptions>;
	private trads: any;

	/**
	 * @param {HTMLElement} container - Élément DOM où injecter le calendrier.
	 * @param {CalendarOptions} options - Options de configuration.
	 */
	constructor(container: HTMLElement, options: CalendarOptions = {}) {
		this.container = container;
		this.options = {
			lang: 'fr',
			mode: 'single',
			disablePast: false,
			availability: {},
			onDateSelect: () => {},
			onRangeSelect: () => {},
			initialDate: new Date(),
			...(options as any)
		};
		// On s'assure d'être au début du mois pour les calculs
		this.currentMonth = startOfMonth(this.options.initialDate);
		this.trads = this.options.lang === 'fr' ? fr : en;
		this.render();
	}

	/**
	 * Passe au mois suivant.
	 */
	public nextMonth(): void {
		this.currentMonth = addMonths(this.currentMonth, 1);
		this.render();
	}

	/**
	 * Passe au mois précédent.
	 */
	public prevMonth(): void {
		this.currentMonth = subMonths(this.currentMonth, 1);
		this.render();
	}

	/**
	 * Sélectionne une date ou gère la plage.
	 * @param {Date} date - La date à sélectionner.
	 */
	public selectDate(date: Date): void {
		if (this.options.mode === 'single') {
			this.selectedDate = date;
			this.options.onDateSelect(date);
		} else {
			// Mode Range
			if (!this.startDate || (this.startDate && this.endDate)) {
				this.startDate = date;
				this.endDate = null;
			} else {
				// Assurer que startDate < endDate
				if (date < this.startDate) {
					this.endDate = this.startDate;
					this.startDate = date;
				} else {
					this.endDate = date;
				}
				this.options.onRangeSelect(this.startDate, this.endDate);
			}
		}
		this.render();
	}

	/**
	 * Change la langue du calendrier.
	 * @param {string} lang - 'fr' ou 'en'.
	 */
	public setLanguage(lang: 'fr' | 'en'): void {
		this.options.lang = lang;
		this.trads = lang === 'fr' ? fr : en;
		this.render();
	}

	/**
	 * Rendu HTML du calendrier.
	 */
	private render(): void {
		const monthName = this.trads.months[this.currentMonth.getMonth()];
		const year = this.currentMonth.getFullYear();

		// Intervalle de 42 jours (6 semaines fixes) pour garantir une hauteur identique mois après mois
		const start = startOfWeek(startOfMonth(this.currentMonth), { weekStartsOn: 1 });
		const end = addDays(start, 41);
		const days = eachDayOfInterval({ start, end });
		const now = new Date();
		const isPastMonth = startOfMonth(this.currentMonth) <= startOfMonth(now);
		const canGoPrev = !this.options.disablePast || !isPastMonth;

		this.container.innerHTML = `
			<div class="calendar">
				<div class="calendar__header">
					<button class="calendar__header-btn" data-action="prev" aria-label="Mois précédent" ${!canGoPrev ? 'disabled style="opacity: 0.3; cursor: default;"' : ''}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
					</button>
					<span class="calendar__header--month">${monthName}</span>
					<div class="calendar__header--year-wrapper">
						<select class="calendar__header--year-select">
							${Array.from({ length: 71 }, (_, i) => year - 50 + i)
								.filter(y => !this.options.disablePast || y >= now.getFullYear())
								.map(y => `
									<option value="${y}" ${y === year ? 'selected' : ''}>${y}</option>
								`).join('')}
						</select>
					</div>
					<button class="calendar__header-btn" data-action="next" aria-label="Mois suivant">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
					</button>
				</div>
				<div class="calendar__body">
				<div class="calendar__weekdays">
					${this.trads.days.map((day: string) => `<span>${day}</span>`).join('')}
				</div>
				<div class="calendar__days">
					${days.map((day: Date) => {
						const dateStr = format(day, 'yyyy-MM-dd');
						const isCurrentMonth = isSameMonth(day, this.currentMonth);
						const isPast = day < startOfDay(now);
						let isSelected = false;
						let isInRange = false;

						if (this.options.mode === 'single') {
							isSelected = !!(this.selectedDate && isSameDay(day, this.selectedDate));
						} else {
							isSelected = !!((this.startDate && isSameDay(day, this.startDate)) || (this.endDate && isSameDay(day, this.endDate)));
							if (this.startDate && this.endDate) {
								isInRange = day > this.startDate && day < this.endDate;
							}
						}

						const isAvailable = !!this.options.availability[dateStr];
						// Si des disponibilités sont définies, les jours sans créneau sont désactivés
						const hasAvailabilityDefined = Object.keys(this.options.availability).length > 0;
						const isUnavailable = hasAvailabilityDefined && !isAvailable;

						let classes = ['calendar__day'];
						if (isCurrentMonth) classes.push('calendar__day--current-month');
						else classes.push('calendar__day--other-month');

						if (isPast) classes.push('calendar__day--past');
						if (isSelected) classes.push('calendar__day--selected');
						if (isInRange) classes.push('calendar__day--range');
						if (isAvailable) classes.push('calendar__day--available');

						// Désactiver : hors mois courant, passé, ou non disponible
						if (!isCurrentMonth || isPast || isUnavailable) classes.push('calendar__day--disabled');

						return `<div class="${classes.join(' ')}" data-date="${dateStr}" role="button" tabindex="0">${day.getDate()}</div>`;
					}).join('')}
				</div>
				</div>
			</div>
		`;

		this.bindEvents();
	}

	/**
	 * Attache les événements DOM.
	 */
	private bindEvents(): void {
		const prevBtn = this.container.querySelector('[data-action="prev"]');
		prevBtn?.addEventListener('click', (e) => {
			e.preventDefault();
			this.prevMonth();
		});

		const nextBtn = this.container.querySelector('[data-action="next"]');
		nextBtn?.addEventListener('click', (e) => {
			e.preventDefault();
			this.nextMonth();
		});

		const yearSelect = this.container.querySelector('.calendar__header--year-select') as HTMLSelectElement;
		if (yearSelect) {
			initSelect(yearSelect, {
				searchEnabled: false,
				itemSelectText: ''
			}, (value) => {
				const selectedYear = parseInt(value as string, 10);
				this.currentMonth = new Date(selectedYear, this.currentMonth.getMonth(), 1);
				this.render();
			});
		}

		const dayEls = this.container.querySelectorAll('.calendar__day:not(.calendar__day--disabled)');
		dayEls.forEach(el => {
			el.addEventListener('click', () => {
				const dateStr = el.getAttribute('data-date');
				if (dateStr) {
					// Splitting to avoid TZ issues with new Date(string)
					const [y, m, d] = dateStr.split('-').map(Number);
					this.selectDate(new Date(y, m - 1, d));
				}
			});
		});
	}
}
