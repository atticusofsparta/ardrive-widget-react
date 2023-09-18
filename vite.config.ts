import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
    dts({ insertTypesEntry: true }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points

      entry: {
        ArdriveWidget: resolve(__dirname, 'src/components/ArdriveWidget.tsx'),
        useArdriveEvents: resolve(
          __dirname,
          'src/hooks/useArdriveEvents/useArdriveEvents.tsx',
        ),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
      },
    },
  },
  // TODO: remove this when no longer deploying to GH pages
  optimizeDeps: {
    //exclude:['@atticusofsparta/arfs-lite-client'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
    },
  },
});
