import React from 'react';
import herosHtml from '../hero-simple.html?raw';
import heroVideoHtml from '../hero-video.html?raw';
import heroBgHtml from '../hero-video-bg.html?raw';
import '../style/heros.css';

/**
 * Section Logo Clouds avec variantes statiques et sliders.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant LogoClouds.
 */
export const Heros = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
			<section>
				<h2 className="h2">Heros</h2>
				<div {...props} dangerouslySetInnerHTML={{ __html: herosHtml }} />
			</section>
			<section>
				<h2 className="h2">Heros vidéo</h2>
				<div {...props} dangerouslySetInnerHTML={{ __html: heroVideoHtml }} />
			</section>
			<section>
				<h2 className="h2">Heros vidéo bg</h2>
				<div {...props} dangerouslySetInnerHTML={{ __html: heroBgHtml }} />
			</section>


		</div>
	);
};
