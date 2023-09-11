import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
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
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ardrive-widget-react',
      // the proper extensions will be added
      fileName: 'ardrive-widget-react',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          React: 'React',
        },
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
  base: '/ardrive-widget-react/',

  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
    },
  },
});
