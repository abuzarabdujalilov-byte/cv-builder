import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { checkRateLimit, processAiGeneration } from './src/server/aiEngine';

function aiProxyPlugin(): Plugin {
  return {
    name: 'ai-proxy-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/generate' && req.method === 'POST') {
          const clientIp = req.socket.remoteAddress || '127.0.0.1';

          // Rate limit check: 10 per minute, 30 per hour
          const limit = checkRateLimit(clientIp);
          if (!limit.allowed) {
            res.statusCode = 429;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error: `Rate limit exceeded. Please wait ${limit.retryAfter || 60} seconds before retrying.`,
              })
            );
            return;
          }

          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });

          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body);
              const result = await processAiGeneration(parsed);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.statusCode = 502;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  error: 'AI generation error',
                  message: err.message,
                })
              );
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), aiProxyPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
