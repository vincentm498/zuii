import { useState } from 'react';
import { Calendar } from '../../../packages/components/calendar/src/react';
import { Booking } from '../../../packages/components/booking/src/react';
import { MOCK_AVAILABILITY } from '../../../packages/components/calendar/src/js/mockData';
import '../../../packages/components/calendar/src/style/index.scss';
import '../../../packages/components/booking/src/style/index.scss';

/**
 * Template de démonstration pour le calendrier et la réservation (Booking).
 * @returns {JSX.Element}
 */
export const Calendars = () => {
	const [selectedDate] = useState<Date | null>(null);

	return (
		<div className="template-calendars">
			<h2 style={{ marginBottom: '40px' }}>Démonstration des composants</h2>

			<section style={{ marginBottom: '60px' }}>
				<h3 style={{ marginBottom: '20px', color: '#666' }}>1. Usage Complet (Calendar + Booking intégrés)</h3>
				<Booking
					disablePast={true}
					availability={MOCK_AVAILABILITY}
					yearsFromNow={20}
					onSlotSelect={(date: Date, slot: string, formData: any) => {
						console.log(`Réservation confirmée : ${date.toLocaleDateString()} à ${slot}`, formData);
						alert(`Merci ${formData.firstname} ! Votre réservation pour le ${date.toLocaleDateString()} à ${slot} est prise en compte.`);
					}}
				/>
			</section>

			<section style={{ marginBottom: '60px' }}>
				<h3 style={{ marginBottom: '20px', color: '#666' }}>2. Formulaire personnalisé</h3>
				<Booking
					disablePast={true}
					availability={MOCK_AVAILABILITY}
					fields={[
						{ name: 'full_name', label: 'Nom complet', type: 'text', required: true },
						{ name: 'email', label: 'Adresse Email', type: 'email', required: true },
						{ name: 'phone', label: 'Téléphone', type: 'tel', required: false },
						{ name: 'reason', label: 'Motif de la visite', type: 'textarea', required: true, placeholder: 'Décrivez brièvement le motif...' }
					]}
					onSlotSelect={(_date, _slot, data) => {
						console.log('Données personnalisées reçues :', data);
					}}
				/>
			</section>

			<hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #eee' }} />

			<section>
				<h3 style={{ marginBottom: '20px', color: '#666' }}>2. Usage Solo (Calendrier uniquement)</h3>
				<div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
					<div style={{ maxWidth: '400px' }}>
						<p style={{ marginBottom: '10px', fontSize: '14px' }}>Mode Single :</p>
						<Calendar
							disablePast={true}
							initialDate={selectedDate || new Date()}
							onDateSelect={(date: Date) => {
								console.log(`Date sélectionnée en solo : ${date.toLocaleDateString()}`);
							}}
						/>
					</div>
					<div style={{ maxWidth: '400px' }}>
						<p style={{ marginBottom: '10px', fontSize: '14px' }}>Mode Range (Plage de jours) :</p>
						<Calendar
							initialDate={selectedDate || new Date()}
							mode="range"
							onRangeSelect={(start: Date, end: Date) => {
								alert(`Plage sélectionnée : du ${start.toLocaleDateString()} au ${end.toLocaleDateString()}`);
							}}
						/>
					</div>
				</div>
			</section>
		</div>
	);
};
