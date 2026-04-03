import { defineConfig } from 'tsup';

export default defineConfig([
	{
		entry: {
			'cookie-consent': 'src/js/cookie-consent.ts',
		},
		outDir: 'dist',
		format: ['esm', 'cjs'],
		dts: true,
		splitting: false,
		sourcemap: true,
		minify: false,
		clean: true, // Seul le 1er nettoie le dist
		external: ['react', 'vanilla-cookieconsent', '@zuii/core', '**/*.scss'],
		loader: {
			'.scss': 'empty'
		}
	},
	{
		entry: {
			'cookie-consent.min': 'src/js/cookie-consent.ts',
			'cookie-consent-react.min': 'src/react/index.tsx',
		},
		outDir: 'dist',
		format: ['esm', 'cjs'],
		dts: false,
		minify: true,
		splitting: false,
		sourcemap: true,
		clean: false,
		external: ['react', 'vanilla-cookieconsent', '@zuii/core', '**/*.scss'],
		loader: {
			'.scss': 'empty'
		}
	},
	{
		entry: {
			'cookie-consent-react': 'src/react/index.tsx',
		},
		outDir: 'dist/react',
		format: ['esm', 'cjs'],
		dts: true,
		splitting: false,
		sourcemap: true,
		clean: false,
		external: ['react', 'vanilla-cookieconsent', '@zuii/core', '**/*.scss'],
		loader: {
			'.scss': 'empty'
		}
	},
	{
		entry: {
			'cookie-consent-react.min': 'src/react/index.tsx',
		},
		outDir: 'dist/react',
		format: ['esm', 'cjs'],
		dts: false,
		minify: true,
		splitting: false,
		sourcemap: true,
		clean: false,
		external: ['react', 'vanilla-cookieconsent', '@zuii/core', '**/*.scss'],
		loader: {
			'.scss': 'empty'
		}
	}
]);
