import React from 'react';
import videoHtml from '../video.html?raw';

/**
 * Section Logo Clouds avec variantes statiques et sliders.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant LogoClouds.
 */
export const Video = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
			<section>
				<h2 className="h2">Video</h2>
				<div {...props} dangerouslySetInnerHTML={{ __html: videoHtml }} />
			</section>
			<section>
				<h2 className="h2">Video Auto</h2>
				<div {...props} dangerouslySetInnerHTML={{ __html: videoAutoHtml }} />
			</section>
		</div>
	);
};
