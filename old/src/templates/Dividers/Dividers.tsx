import React from 'react';
import { Divider } from '../../index';

/**
 * Template de démonstration pour le composant Divider.
 * @returns {JSX.Element} La page de démo des dividers.
 */
export const Dividers = () => {
	const spacings = ["sm", "md", "lg"] as const;
	const heights = ["sm", "md", "lg", "xl", "xxl"] as const;

	return (
		<div>
			<section>
				<h3 className="">Dividers de base</h3>
				<Divider className='bg-primary' />
				<Divider className='bg-secondary' />
				<Divider className='bg-accent' />
				<Divider className='bg-tertiary' />
				<Divider className='bg-success' />
				<Divider className='bg-danger' />
				<Divider className='bg-warning' />
				<Divider className='bg-info' />
				<Divider className='bg-light' />
				<Divider className='bg-dark' />
			</section>

			<section>
				<h3 className="">Avec texte</h3>
				<div className="">
					<Divider>OU</Divider>
					<Divider>
						<span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
							Information importante
						</span>
					</Divider>
					<p>Fin de section</p>
				</div>
			</section>

			<section>
				<h3 className="">Variantes d'espacement (Spacing)</h3>
				<div className="">
					{spacings.map((s) => (
						<React.Fragment key={s}>
							<div className="p-2 bg-gray-100">Spacing: {s}</div>
							<Divider spacing={s} />
						</React.Fragment>
					))}
				</div>
			</section>

			<section>
				<h3 className="">Épaisseurs (Height)</h3>
				<div className="">
					{heights.map((h) => (
						<div key={h}>
							<div className="mb-1 text-xs">Height: {h}</div>
							<Divider height={h} />
						</div>
					))}
				</div>
			</section>
		</div>
	);
};
