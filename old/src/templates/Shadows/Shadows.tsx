import { Group, Shadow } from '../../index';

/**
 * Template de démonstration pour le composant Shadow.
 */
export const Shadows = () => {
	return (
		<div className="flex flex-col gap-8">
			<section>
				<h3 className="mb-4">Shadows</h3>
				<Group>
					<Shadow variant="xs" />
					<Shadow variant="sm" />
					<Shadow variant="md" />
					<Shadow variant="lg" />
					<Shadow variant="xl" />
					<Shadow variant="2xl" />
					<Shadow variant="outline" />
					<Shadow variant="inset" />
					<Shadow variant="none" />
				</Group>
			</section>
		</div>
	);
};
