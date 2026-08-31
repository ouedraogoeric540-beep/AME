import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

// Local dev mock plugin for Netlify functions
function netlifyFunctionsLocalDevPlugin() {
  return {
    name: 'netlify-functions-local-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) {
          return next();
        }

        const env = loadEnv('development', process.cwd(), '');
        const adminPassword = env.ADMIN_PASSWORD || '12345678910';

        // Parse JSON body
        let body = {};
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
          const buffers = [];
          for await (const chunk of req) {
            buffers.push(chunk);
          }
          const data = Buffer.concat(buffers).toString('utf-8');
          try {
            body = JSON.parse(data);
          } catch {
            body = {};
          }
        }

        res.setHeader('Content-Type', 'application/json');

        // /api/admin-login
        if (req.url === '/api/admin-login' && req.method === 'POST') {
          if (body.password === adminPassword) {
            res.statusCode = 200;
            return res.end(JSON.stringify({
              success: true,
              token: 'local-dev-admin-token-ok.signature',
              message: 'Connexion réussie.'
            }));
          } else {
            res.statusCode = 401;
            return res.end(JSON.stringify({
              error: 'Mot de passe incorrect.'
            }));
          }
        }

        // /api/admin-verify
        if (req.url === '/api/admin-verify') {
          const auth = req.headers.authorization;
          if (auth && auth.includes('local-dev-admin-token-ok')) {
            res.statusCode = 200;
            return res.end(JSON.stringify({ authenticated: true }));
          }
          res.statusCode = 401;
          return res.end(JSON.stringify({ authenticated: false }));
        }

        // /api/site-data-get
        if (req.url === '/api/site-data-get' && req.method === 'GET') {
          try {
            const siteDataPath = path.resolve(process.cwd(), 'src/data/siteData.json');
            const data = JSON.parse(fs.readFileSync(siteDataPath, 'utf-8'));
            res.statusCode = 200;
            return res.end(JSON.stringify({ siteData: data, sha: 'local-sha', source: 'local' }));
          } catch (err) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: err.message }));
          }
        }

        // /api/site-data-save
        if (req.url === '/api/site-data-save' && req.method === 'POST') {
          try {
            const siteDataPath = path.resolve(process.cwd(), 'src/data/siteData.json');
            if (body.siteData) {
              fs.writeFileSync(siteDataPath, JSON.stringify(body.siteData, null, 2), 'utf-8');
            }
            res.statusCode = 200;
            return res.end(JSON.stringify({
              success: true,
              message: 'Données enregistrées localement dans src/data/siteData.json',
              siteData: body.siteData
            }));
          } catch (err) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: err.message }));
          }
        }

        // Pass through if not handled
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), netlifyFunctionsLocalDevPlugin()]
});
