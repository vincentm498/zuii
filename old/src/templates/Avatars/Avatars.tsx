import { Avatar, Group } from '../../index';


/**
 * Template affichant une liste d'icônes générée dynamiquement à partir des jetons.
 * @param {Props} props Les propriétés du composant.
 * @returns {JSX.Element} Le composant de démonstration des icônes.
 */
export const Avatars = () => {
	const sizes: ("sm" | "md" | "lg")[] = ["sm", "md", "lg"];
	const shapes: ("round" | "square")[] = ["round", "square"];
	const statuses: ("online" | "offline" | "away" | "busy")[] = ["online", "offline", "away", "busy"];

	return (
		<div className="flex flex-col gap-8">
			{/* Tailles et Formes */}
			<section>
				<h3 className="mb-4">Tailles et Formes</h3>
				<div>
					{shapes.map((shape) => (
						<div key={shape} >
							<Group >
								{sizes.map((size) => (
									<Group key={`${shape}-${size}`} vertical center>
										<Avatar size={size} shape={shape} />
										<span className="text-xs">{size}</span>
									</Group>
								))}
							</Group>
						</div>
					))}
				</div>
			</section>

			{/* Contenus (Initiales, Image, Icone) */}
			<section>
				<h3 className="mb-4">Types de contenu</h3>
				<Group >
					<Group vertical center>
						<Avatar initials="JD" />
						<span className="text-xs">Initiales</span>
					</Group>
					<Group vertical center>
						<Avatar src="https://i.pravatar.cc/150?u=1" alt="John Doe" />
						<span className="text-xs">Image</span>
					</Group>
					<Group vertical center>
						<Avatar />
						<span className="text-xs">Défaut (Icône)</span>
					</Group>
				</Group>
			</section>

			{/* Statuts */}
			<section>
				<h3 className="mb-4">Statuts</h3>
				<Group>
					{statuses.map((status) => (
						<Group key={status} vertical center>
							<Avatar
								status={status}
								src={`https://i.pravatar.cc/150?u=${status}`}
							/>
						</Group>
					))}
				</Group>
			</section>

			{/* Combinaison Groups */}
			<section>
				<h3 className="mb-4">Dans un Group</h3>
				<Group gap="none" className="avatar-group">
					<Avatar size="md" src="https://i.pravatar.cc/150?u=a" status="online" />
					<Avatar size="md" src="https://i.pravatar.cc/150?u=b" status="busy" />
					<Avatar size="md" src="https://i.pravatar.cc/150?u=c" status="away" />
					<Avatar size="md" initials="+5" />
				</Group>
			</section>
		</div>
	);
};

