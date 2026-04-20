import { Controller } from '@hotwired/stimulus';
import { Calendar } from '../js/Calendar';

/**
 * Stimulus controller for @zuii/calendar.
 * 
 * Usage in Twig:
 * <div {{ stimulus_controller('@zuii/calendar/symfony', {
 *    lang: 'fr',
 *    mode: 'single',
 *    availability: { '2026-04-02': ['10:00'] }
 * }) }}></div>
 */
export default class extends Controller {
	static values = {
		lang: { type: String, default: 'fr' },
		mode: { type: String, default: 'single' },
		disablePast: { type: Boolean, default: false },
		availability: { type: Object, default: {} },
		initialDate: String
	};

	declare langValue: 'fr' | 'en';
	declare modeValue: 'single' | 'range';
	declare disablePastValue: boolean;
	declare availabilityValue: Record<string, (string | any)[]>;
	declare initialDateValue: string;

	private calendar: Calendar | null = null;

	connect() {
		const options: any = {
			lang: this.langValue,
			mode: this.modeValue,
			disablePast: this.disablePastValue,
			availability: this.availabilityValue,
			onDateSelect: (date: Date) => {
				this.dispatch('date-select', { detail: { date } });
			},
			onRangeSelect: (start: Date, end: Date) => {
				this.dispatch('range-select', { detail: { start, end } });
			}
		};

		if (this.initialDateValue) {
			options.initialDate = new Date(this.initialDateValue);
		}

		this.calendar = new Calendar(this.element as HTMLElement, options);
	}

	/**
	 * Callback Stimulus quand la langue change dynamiquement.
	 */
	langValueChanged() {
		if (this.calendar) {
			this.calendar.setLanguage(this.langValue);
		}
	}
}
