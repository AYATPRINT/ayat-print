import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@ayatstudio/types': path.resolve(__dirname, '../../packages/types/src/index.ts'),
      '@ayatstudio/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
      '@ayatstudio/studio-core': path.resolve(__dirname, '../../packages/studio-core/src/index.ts'),
      '@ayatstudio/mockup-engine': path.resolve(__dirname, '../../packages/mockup-engine/src/index.tsx'),
      '@ayatstudio/db': path.resolve(__dirname, '../../packages/db/src/index.ts'),
      '@ayat/types': path.resolve(__dirname, '../../packages/types/src/index.ts'),
      '@ayat/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
      '@ayat/studio-core': path.resolve(__dirname, '../../packages/studio-core/src/index.ts'),
      '@ayat/mockup-engine': path.resolve(__dirname, '../../packages/mockup-engine/src/index.tsx'),
      '@ayat/db': path.resolve(__dirname, '../../packages/db/src/index.ts'),
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
