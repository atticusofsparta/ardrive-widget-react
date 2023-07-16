import react from '@vitejs/plugin-react';
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
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
