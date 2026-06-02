import React from 'react';
import videoHtml from '../video.html?raw';
import videoAutoHtml from '../video-auto.html?raw';
import { CodePreview } from '@zuii/core/react';

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
				<CodePreview code={videoHtml} />
			</section>
			<section>
				<h2 className="h2">Video Auto</h2>
				<div {...props} dangerouslySetInnerHTML={{ __html: videoAutoHtml }} />
				<CodePreview code={videoAutoHtml} />
			</section>
		</div>
	);
};
