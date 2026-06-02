import React from 'react';
import bannerHtml from '../banner.html?raw';
import bannerClosableHtml from '../banner-closable.html?raw';
import bannerSliderHtml from '../banner-slider.html?raw';
import bannerSuccessHtml from '../banner-success.html?raw';
import bannerFloatingHtml from '../banner-floating.html?raw';

import { CodePreview } from '@zuii/core/react';

import '../banner.css';

/**
 * Section Banner.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant Banner.
 */
export const Banner = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return (

		<div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
			<section>
				<h2 className="h2">Banner Default</h2>
				<p className="p" style={{ marginBottom: '1rem', opacity: 0.7 }}>
					Annonce standard pour des informations générales. Idéale pour des messages neutres.
				</p>
				<div dangerouslySetInnerHTML={{ __html: bannerHtml }} />
				<CodePreview code={bannerHtml} />
			</section>

			<section>
				<h2 className="h2">Banner Closable</h2>
				<p className="p" style={{ marginBottom: '1rem', opacity: 0.7 }}>
					Toutes les bannières peuvent être refermables. Il suffit d'ajouter un bouton avec l'attribut <code>data-banner-close</code>.
				</p>
				<div dangerouslySetInnerHTML={{ __html: bannerClosableHtml }} />
				<CodePreview code={bannerClosableHtml} />
			</section>

			<section>
				<h2 className="h2">Banner Success</h2>
				<p className="p" style={{ marginBottom: '1rem', opacity: 0.7 }}>
					Confirmations et informations positives.
				</p>
				<div dangerouslySetInnerHTML={{ __html: bannerSuccessHtml }} />
				<CodePreview code={bannerSuccessHtml} />
			</section>

			<section>
				<h2 className="h2">Banner Floating Gradient</h2>
				<p className="p" style={{ marginBottom: '1rem', opacity: 0.7 }}>
					Variante Premium pour promotions importantes.
				</p>
				<div dangerouslySetInnerHTML={{ __html: bannerFloatingHtml }} />
				<CodePreview code={bannerFloatingHtml} />
			</section>

			<section>
				<h2 className="h2">Banner Slider</h2>
				<p className="p" style={{ marginBottom: '1rem', opacity: 0.7 }}>
					Multi-annonces compactes utilisant SplideJS.
				</p>
				<div dangerouslySetInnerHTML={{ __html: bannerSliderHtml }} />
				<CodePreview code={bannerSliderHtml} />
			</section>
		</div>
	);
};


