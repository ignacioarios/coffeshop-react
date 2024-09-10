import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',  // This alias is correct and simplifies imports.
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',  // This is also fine for CSS modules.
    },
  },
});