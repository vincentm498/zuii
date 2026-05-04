import { Controller } from '@hotwired/stimulus';
import { Booking } from '../js/Booking';

/**
 * Stimulus controller for @zuii/booking.
 * 
 * Usage in Twig:
 * <div {{ stimulus_controller('@zuii/booking/symfony', {
 *    lang: 'fr',
 *    availability: { '2026-04-02': ['10:00', '11:00'] },
 *    fields: [
 *        { name: 'name', label: 'Nom', type: 'text', required: true }
 *    ]
 * }) }}></div>
 */
export default class extends Controller {
	static values = {
		lang: { type: String, default: 'fr' },
		availability: { type: Object, default: {} },
		selectedDate: String,
		inputName: { type: String, default: 'booking_datetime' },
		fields: { type: Array, default: [] },
		mode: { type: String, default: 'single' },
		disablePast: { type: Boolean, default: false },
		initialDate: String
	};

	declare langValue: 'fr' | 'en';
	declare availabilityValue: Record<string, string[]>;
	declare selectedDateValue: string;
	declare inputNameValue: string;
	declare fieldsValue: any[];
	declare modeValue: 'single' | 'range';
	declare disablePastValue: boolean;
	declare initialDateValue: string;

	private booking: Booking | null = null;

	connect() {
		const options: any = {
			lang: this.langValue,
			availability: this.availabilityValue,
			inputName: this.inputNameValue,
			mode: this.modeValue,
			disablePast: this.disablePastValue,
			onSlotSelect: (date: Date, slot: string, formData: any) => {
				this.dispatch('slot-select', { detail: { date, slot, formData } });
			}
		};

		if (this.selectedDateValue) {
			options.selectedDate = new Date(this.selectedDateValue);
		}
		if (this.initialDateValue) {
			options.initialDate = new Date(this.initialDateValue);
		}
		if (this.fieldsValue && this.fieldsValue.length > 0) {
			options.fields = this.fieldsValue;
		}

		this.booking = new Booking(this.element as HTMLElement, options);
	}

	/**
	 * Callback Stimulus quand la langue change dynamiquement.
	 */
	langValueChanged() {
		if (this.booking) {
			this.booking.setLanguage(this.langValue);
		}
	}
}
