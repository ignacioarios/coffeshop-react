import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', 
    },
  },
  build: {
    sourcemap: true, 
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Dividir en chunks basados en el nombre del módulo
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('firebase')) {
              return 'vendor'; // Crea un chunk llamado vendor para estas librerías
            }
          }
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',  
    },
  },
});
