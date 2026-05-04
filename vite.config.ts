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
  optimizeDeps: {
    include: ['@uppy/locales/lib/fr_FR', '@uppy/locales/lib/en_US']
  },
  resolve: {
    alias: {
      '@zuii/core': resolve(__dirname, 'packages/core/src'),
      '@zuii/cookie-consent/react': resolve(__dirname, 'packages/components/cookie-consent/src/react/index.tsx'),
      '@zuii/cookie-consent/style': resolve(__dirname, 'packages/components/cookie-consent/src/style/index.scss'),
      '@zuii/cookie-consent': resolve(__dirname, 'packages/components/cookie-consent/src/js/cookie-consent.ts'),
      '@zuii/modal/react': resolve(__dirname, 'packages/components/modal/src/react/index.tsx'),
      '@zuii/modal': resolve(__dirname, 'packages/components/modal/src/js/index.ts'),
      '@zuii/booking': resolve(__dirname, 'packages/components/booking/src/js/Booking.ts'),
      '@zuii/calendar': resolve(__dirname, 'packages/components/calendar/src/js/Calendar.ts'),
      '@core': resolve(__dirname, 'packages/core/src/styles'),
    },

  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['color-functions', 'import', 'global-builtin', 'if-function'],
      },
    },
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
