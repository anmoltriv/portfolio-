import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type { Connect, Plugin } from 'vite';
import {defineConfig} from 'vite';
import {fetchContributionCalendar} from './src/git/fetchCalendar';

function githubContributionsApi(): Plugin {
  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    const path = req.url?.split('?')[0];
    if (path !== '/api/github-contributions') {
      next();
      return;
    }

    void fetchContributionCalendar()
      .then((body) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'public, max-age=60');
        res.end(JSON.stringify(body));
      })
      .catch((error: unknown) => {
        console.error('GitHub contributions fetch failed:', error);
        res.statusCode = 502;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({error: 'Failed to load GitHub contributions.'}));
      });
  };

  return {
    name: 'github-contributions-api',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), githubContributionsApi()],
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
