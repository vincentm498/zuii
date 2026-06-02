import React from 'react';
import socialMediaHtml from '../social-media.html?raw';
import { CodePreview } from '@zuii/core/react';
import '../style/social-media.css';



export const SocialMedia = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
			<section>
				<h2 className="h2">Social Media</h2>
				<div {...props} dangerouslySetInnerHTML={{ __html: socialMediaHtml }} />
				<CodePreview code={socialMediaHtml} />
			</section>
		</div>
	);
};
