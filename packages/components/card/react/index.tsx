import React from 'react';
import cardHtml from '../card.html?raw';
import { CodePreview } from '@zuii/core/react';

/**
 * Section Card avec variantes statiques et sliders.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant Card.
 */
export const Cards = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
			<section>
				<h2 className="h2">Card</h2>

				<div {...props} dangerouslySetInnerHTML={{ __html: cardHtml }} />
				<CodePreview code={cardHtml} />
			</section>
		</div>
	);
};
