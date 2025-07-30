import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Minimal Vite config - hızlı başlatma için
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    host: true,
    warmup: {
      clientFiles: ['./src/main.tsx', './src/App.tsx']
    }
  },
  build: {
    target: 'es2015',
    minify: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
});
