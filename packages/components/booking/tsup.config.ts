import { defineConfig } from 'tsup';

export default defineConfig({
	entry: {
		index: 'src/js/index.ts',
		'react/index': 'src/react/index.tsx',
	},
	format: ['cjs', 'esm'],
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	treeshake: true,
	minify: true,
	external: ['react', 'date-fns', '@zuii/calendar'],
});
