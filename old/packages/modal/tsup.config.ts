import { defineConfig } from 'tsup';

export default defineConfig({
	entry: {
		index: 'src/js/index.ts',
		'react/index': 'src/react/index.tsx',
	},
	format: ['cjs', 'esm'],
	dts: false,
	splitting: false,
	sourcemap: true,
	clean: true,
	treeshake: false,
	minify: false,
	external: ['react', '@zuii/core', 'bootstrap', 'react-bootstrap', /\.scss$/],
});
