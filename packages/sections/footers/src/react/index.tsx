import React from 'react';
import footerColsHtml from '../footer-cols.html?raw';
import footerSimpleCenteredHtml from '../footer-simple-centered.html?raw';
import '../style/footer.css';
import '../../../../components/social-media/src/style/social-media.css'

const FooterCols = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return <div {...props} dangerouslySetInnerHTML={{ __html: footerColsHtml }} />;
};

const FooterSimpleCentered = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return <div {...props} dangerouslySetInnerHTML={{ __html: footerSimpleCenteredHtml }} />;
};


export const Footers = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
			<section>
				<h2 className="h2">Footer Cols</h2>
				<FooterCols />
			</section>
			<hr />
			<section>
				<h2 className="h2">Footer Simple Centered</h2>
				<FooterSimpleCentered />
			</section>
		</div>
	);
};
