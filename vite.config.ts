import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  root: 'playground',
  plugins: [
    react(),
	libInjectCss(),
    dts({
      insertTypesEntry: true,
      include: [resolve(__dirname, 'src')],
      entryRoot: resolve(__dirname, 'src'),
      exclude: ['src/playground.tsx', '**/playground/**'],
      outDir: resolve(__dirname, 'dist'),
      staticImport: true
    })
  ],
  resolve: {
    alias: {
      '@core': resolve(__dirname, 'src/core/styles'),
    },
  },
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
	cssCodeSplit: true,
    lib: {
      name: 'zuii',
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        'react/jsx-runtime'
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: resolve(__dirname, 'src'),
        exports: 'named',
        entryFileNames: ({ name }) => `${name}.js`,
        assetFileNames: (assetInfo) => {
          // Garde la structure des dossiers pour le CSS/SCSS
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
             return '[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
    emptyOutDir: true,
  },
});
