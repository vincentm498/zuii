import React, { useEffect } from 'react';
import logoCloudsHtml from '../logo-clouds.html?raw';
import logoCloudsSliderHtml from '../logo-clouds-slider.html?raw';
import { initLogoClouds } from '../js';
import { CodePreview } from '@zuii/core/react';
import '../style/logo-clouds.css';

/**
 * Section Logo Clouds avec variantes statiques et sliders.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant LogoClouds.
 */
export const LogoClouds = (props: React.HTMLAttributes<HTMLDivElement>) => {
	useEffect(() => {
		initLogoClouds();
	}, []);

	return (
		<div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
			<section>
				<h2 className="h2">Logo Clouds</h2>
				<div dangerouslySetInnerHTML={{ __html: logoCloudsHtml }} />
				<CodePreview code={logoCloudsHtml} />
			</section>
			<section>
				<h2 className="h2">Logo Clouds slider</h2>
				<div dangerouslySetInnerHTML={{ __html: logoCloudsSliderHtml }} />
				<CodePreview code={logoCloudsSliderHtml} />
			</section>
		</div>
	);
};

