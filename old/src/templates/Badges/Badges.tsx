import { Badge, Group, Icon } from '../../index';

/**
 * Template de démonstration pour le composant Badge.
 * @returns {JSX.Element} La page de démo des badges.
 */
export const Badges = () => {
	const variants = ["primary", "secondary", "tertiary", "success", "danger", "warning", "info", "light", "dark"] as const;
	const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

	return (
		<div className="flex flex-col gap-8 p-4">
			<section>
				<h3 className="mb-4 text-xl font-bold">Badges Standards</h3>
				<Group  gap="sm">
					{variants.map((v) => (
						<Badge key={v} variant={v}>
							{v.charAt(0).toUpperCase() + v.slice(1)}
						</Badge>
					))}
				</Group>
			</section>

			<section>
				<h3 className="mb-4 text-xl font-bold">Badges Outline</h3>
				<Group  gap="sm">
					{variants.map((v) => (
						<Badge key={v} variant={v} outline>
							{v.charAt(0).toUpperCase() + v.slice(1)}
						</Badge>
					))}
				</Group>
			</section>

			<section>
				<h3 className="mb-4 text-xl font-bold">Tailles</h3>
				<Group gap="lg" >
					{sizes.map((s) => (
						<Badge key={s} size={s}>
							Badge {s.toUpperCase()}
						</Badge>
					))}
				</Group>
			</section>



			<section>
				<h3 className="mb-4 text-xl font-bold">Avec icône</h3>
				<Group  gap="sm">
					<Badge variant="primary">
						<Icon name="icon-check" size="sm" />
						<span>Nouveau</span>
					</Badge>
					<Badge variant="success">
						<Icon name="icon-check" size="sm" />
						<span>Vérifié</span>
					</Badge>
				</Group>
			</section>
		</div>
	);
};
