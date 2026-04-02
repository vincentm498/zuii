import { useEffect, useRef } from 'react';
import { Booking as VanillaBooking, type BookingOptions } from '../js/Booking';

export interface BookingProps extends BookingOptions {
	className?: string;
}

/**
 * Wrapper React pour le composant Booking (Calendrier + Créneaux).
 * @param {BookingProps} props - Les propriétés de la réservation.
 * @returns {JSX.Element}
 */
export const Booking = ({
	lang = 'fr',
	availability = {},
	onSlotSelect,
	selectedDate = null,
	inputName = 'booking_datetime',
	className = '',
	mode = 'single',
	disablePast = false,
	initialDate = new Date(),
	onRangeSelect,
	fields,
}: BookingProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const bookingInstance = useRef<VanillaBooking | null>(null);

	useEffect(() => {
		if (containerRef.current && !bookingInstance.current) {
			bookingInstance.current = new VanillaBooking(containerRef.current, {
				lang,
				availability,
				selectedDate,
				inputName,
				onSlotSelect,
				mode,
				disablePast,
				initialDate,
				onRangeSelect,
				fields,
			});
		}
	}, []);

	useEffect(() => {
		if (bookingInstance.current) {
			bookingInstance.current.setLanguage(lang);
		}
	}, [lang]);

	useEffect(() => {
		if (bookingInstance.current) {
			if (selectedDate) {
				bookingInstance.current.updateDate(selectedDate);
			} else if (selectedDate === null) {
				// Gérer le cas où on repasse à null
				bookingInstance.current.updateDate(null as any);
			}
		}
	}, [selectedDate]);

	return <div ref={containerRef} className={`booking ${className}`} />;
};
