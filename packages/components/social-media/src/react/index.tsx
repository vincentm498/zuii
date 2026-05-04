import React from 'react';
import '../style/social-media.css';



export const socialMedia = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
			<section>
				<h2 className="h2">Foot@er Cols</h2>
			</section>
			<hr />
			<section>
				<h2 className="h2">Footer Simple Centered</h2>
				<div style={{ backgroundColor: 'var(--zuii-surface, #c0c0c01d)', borderRadius: 'var(--radius-sm, 0.25rem)', margin: '20px' }}>
				</div>
			</section>
			<hr />
		</div>
	);
};
