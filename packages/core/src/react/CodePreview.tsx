import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodePreviewProps {
	code: string;
	language?: string;
	theme?: 'light' | 'dark';
}

/**
 * Composant utilitaire pour afficher et copier des extraits de code dans le playground.
 *
 * @param {CodePreviewProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le composant CodePreview.
 */
export const CodePreview = ({ code, language = 'html', theme = 'light' }: CodePreviewProps) => {
	const [copied, setCopied] = React.useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const isDark = theme === 'dark';

	return (
		<div style={{ position: 'relative', marginTop: '1rem' }}>
			<button
				onClick={handleCopy}
				style={{
					position: 'absolute',
					top: '0.5rem',
					right: '0.5rem',
					backgroundColor: copied ? '#10b981' : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
					color: isDark || copied ? 'white' : 'var(--primary-dark)',
					border: 'none',
					padding: '4px 8px',
					borderRadius: '4px',
					fontSize: '0.7rem',
					cursor: 'pointer',
					transition: 'all 0.2s ease',
					zIndex: 10,
					backdropFilter: 'blur(4px)'
				}}
			>
				{copied ? 'Copié !' : 'Copier'}
			</button>
			<SyntaxHighlighter
				language={language}
				style={isDark ? atomDark : oneLight}
				customStyle={{
					margin: 0,
					borderRadius: '8px',
					fontSize: '0.85rem',
					padding: '1.25rem',
					backgroundColor: isDark ? '#0f172a' : '#f8fafc',
					border: isDark ? 'none' : '1px solid #e2e8f0'
				}}
			>
				{code.trim()}
			</SyntaxHighlighter>
		</div>
	);
};



