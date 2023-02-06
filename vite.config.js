import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: { // when using npm dev script, must also run server
      '/v1': 'http://localhost',
      '/img': 'http://localhost'
    }
  }
});