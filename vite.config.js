import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // '@app': path.resolve(__dirname, './src/app'),
      // '@modules': path.resolve(__dirname, './src/modules'),
      // '@components': path.resolve(__dirname, './src/components'),
      // '@layouts': path.resolve(__dirname, './src/layouts'),
      // '@hooks': path.resolve(__dirname, './src/hooks'),
      // '@services': path.resolve(__dirname, './src/services'),
      // '@api': path.resolve(__dirname, './src/api'),
      // '@store': path.resolve(__dirname, './src/store'),
      // '@utils': path.resolve(__dirname, './src/utils'),
      // '@assets': path.resolve(__dirname, './src/assets'),
      // '@constants': path.resolve(__dirname, './src/constants'),
      // '@theme': path.resolve(__dirname, './src/theme'),
      // '@widgets': path.resolve(__dirname, './src/widgets'),
    },
  },
});