import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/SodaComparer/',
  plugins: [
    react(),
    {
      name: 'configure-mime-types',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.endsWith('.jsx')) {
            res.setHeader('Content-Type', 'application/javascript');
          }
          next();
        });
      }
    }
  ],
})