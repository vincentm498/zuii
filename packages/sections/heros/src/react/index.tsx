import React from 'react';
import herosHtml from '../hero-simple.html?raw';
import heroVideoHtml from '../hero-video.html?raw';
import heroBgHtml from '../hero-video-bg.html?raw';
import { CodePreview } from '@zuii/core/react';
import '../style/heros.css';

/**
 * Section Heros.
 */
export const Heros = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
			<section>
				<h2 className="h2">Heros</h2>
				<div dangerouslySetInnerHTML={{ __html: herosHtml }} />
				<CodePreview code={herosHtml} />
			</section>
			<section>
				<h2 className="h2">Heros vidéo</h2>
				<div dangerouslySetInnerHTML={{ __html: heroVideoHtml }} />
				<CodePreview code={heroVideoHtml} />
			</section>
			<section>
				<h2 className="h2">Heros vidéo bg</h2>
				<div dangerouslySetInnerHTML={{ __html: heroBgHtml }} />
				<CodePreview code={heroBgHtml} />
			</section>
		</div>
	);
};

