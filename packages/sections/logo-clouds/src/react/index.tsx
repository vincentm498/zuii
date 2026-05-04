import React from 'react';
import ctaHtml from '../cta.html?raw';
import ctaCenterHtml from '../cta-center.html?raw';
import '../style/cta.css';



export const CTA = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
			<section>
				<h2 className="h2">CTA</h2>
				<p className="p">Il s'agit d'un CTA avec une mise en page à gauche. Il sert à afficher un appel à l'action avec une mise en page à gauche.</p>
				<div {...props} dangerouslySetInnerHTML={{ __html: ctaHtml }} />
			</section>
			<section>
				<h2 className="h2">CTA center</h2>
				<p className="p">Il s'agit d'un CTA avec une mise en page centrée. Il sert à afficher un appel à l'action avec une mise en page centrée.</p>
				<div {...props} dangerouslySetInnerHTML={{ __html: ctaCenterHtml }} />
			</section>

		</div>
	);
};
