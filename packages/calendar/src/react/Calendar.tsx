import { useEffect, useRef } from 'react';
import { Calendar as VanillaCalendar } from '../js/Calendar';

export interface CalendarProps {
	lang?: 'fr' | 'en';
	mode?: 'single' | 'range';
	disablePast?: boolean;
	availability?: Record<string, string[]>;
	onDateSelect?: (date: Date) => void;
	onRangeSelect?: (start: Date, end: Date) => void;
	initialDate?: Date;
	className?: string;
}

/**
 * Wrapper React pour le composant Calendar.
 * @param {CalendarProps} props - Les propriétés du calendrier.
 * @returns {JSX.Element}
 */
export const Calendar = ({
	lang = 'fr',
	mode = 'single',
	disablePast = false,
	availability = {},
	onDateSelect,
	onRangeSelect,
	initialDate,
	className = '',
}: CalendarProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const calendarInstance = useRef<VanillaCalendar | null>(null);

	useEffect(() => {
		if (containerRef.current && !calendarInstance.current) {
			calendarInstance.current = new VanillaCalendar(containerRef.current, {
				lang,
				mode,
				disablePast,
				availability,
				onDateSelect,
				onRangeSelect,
				initialDate,
			});
		}
	}, []);

	useEffect(() => {
		if (calendarInstance.current) {
			calendarInstance.current.setLanguage(lang);
		}
	}, [lang]);

	return <div ref={containerRef} className={`calendar-wrapper ${className}`} />;
};
