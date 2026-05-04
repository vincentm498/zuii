import { Group } from '../../index';
import { Button } from '../../index';

const BOX_STYLE: React.CSSProperties = {
	width: 200,
	height: 120,
	background: 'var(--color-neutral-100, #f1f5f9)',
	border: '1px dashed var(--color-neutral-300, #cbd5e1)',
	borderRadius: 8,
};

/**
 * Template de démonstration pour le composant Group.
 * @returns {JSX.Element} La page de démo des groupes.
 */
export const Groups = () => {
	const positions = [
		'top-left', 'top-center', 'top-right',
		'center-left', 'center', 'center-right',
		'bottom-left', 'bottom-center', 'bottom-right',
	] as const;


	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

			{/* Direction */}
			<section>
				<h3>Direction</h3>
				<Group gap="lg">
					<div>
						<p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Horizontal (défaut)</p>
						<Group>
							<Button>•</Button>
							<Button>•</Button>
							<Button>•</Button>
						</Group>
					</div>
					<div>
						<p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Vertical</p>
						<Group vertical>
							<Button>•</Button>
							<Button>•</Button>
							<Button>•</Button>
						</Group>
					</div>
				</Group>
			</section>


			{/* Align (axe principal) */}
			<section>
				<h3>Alignement (align)</h3>
				<Group vertical gap="md">
					{(['start', 'center', 'end', 'between'] as const).map((a) => (
						<div key={a} style={{ width: '100%' }}>
							<p style={{ marginBottom: '0.25rem', fontSize: '0.8rem', opacity: 0.6 }}>align="{a}"</p>
							<Group align={a} style={{ width: '100%', border: '1px dashed var(--color-neutral-300, #cbd5e1)', padding: '0.5rem', borderRadius: 6 }}>
								<Button size="sm">•</Button>
								<Button size="sm">•</Button>
								<Button size="sm">•</Button>
							</Group>
						</div>
					))}
				</Group>
			</section>

			{/* Position */}
			<section>
				<h3>Position (flexbox)</h3>
				<Group gap="md" style={{ flexWrap: 'wrap' }}>
					{positions.map((pos) => (
						<div key={pos} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
							<p style={{ fontSize: '0.75rem', opacity: 0.6, textAlign: 'center' }}>{pos}</p>
							<Group align={pos} style={BOX_STYLE}>
								<Button size="sm">•</Button>
							</Group>
						</div>
					))}
				</Group>
			</section>

		</div>
	);
};
