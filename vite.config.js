import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // @ = src
    },
  },
  server: {
    // Configure static file serving
    fs: {
      // Allow serving files from one level up from the package root
      allow: ['..']
    }
  },
  // Ensure JSON files are properly handled
  json: {
    stringify: false
  },
  // Configure build settings
  build: {
    // Copy public directory to dist
    assetsDir: 'assets',
    // Ensure static files are copied to the right location
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
});
