import React from 'react';
import copyrightCenterHtml from '../copyright-center.html?raw';
import copyrightSocialHtml from '../copyright-social-media.html?raw';
import { CodePreview } from '@zuii/core/react';
import '../style/copyright.css';
import '../../../../components/social-media/src/style/social-media.css'

const CopyrightCenter = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<>
			<div {...props} dangerouslySetInnerHTML={{ __html: copyrightCenterHtml }} />
			<CodePreview code={copyrightCenterHtml} />
		</>
	);
};

const CopyrightSocial = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<>
			<div {...props} dangerouslySetInnerHTML={{ __html: copyrightSocialHtml }} />
			<CodePreview code={copyrightSocialHtml} />
		</>
	);
};


export const Copyrights = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
			<section>
				<h2 className="h2">Copyright Center</h2>
				<CopyrightCenter />
			</section>
			<hr />
			<section>
				<h2 className="h2">Copyright Social</h2>
				<CopyrightSocial />
			</section>
		</div>
	);
};

