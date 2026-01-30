/**
 * Vite Configuration
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, './src/@types'),
      '@api': path.resolve(__dirname, './src/api'),
      '@store': path.resolve(__dirname, './src/store'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@config': path.resolve(__dirname, './src/config'),
      '@components': path.resolve(__dirname, './src/components'),
      '@components/ui': path.resolve(__dirname, './src/components/ui'),
      '@components/layout': path.resolve(__dirname, './src/components/layout'),
      '@components/forms': path.resolve(__dirname, './src/components/forms'),
      '@components/features': path.resolve(__dirname, './src/components/features'),
      '@components/common': path.resolve(__dirname, './src/components/common'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['zustand'],
        },
      },
    },
  },
});
