import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    base: '/',  // Make sure the base is '/' for local development
  },
});
