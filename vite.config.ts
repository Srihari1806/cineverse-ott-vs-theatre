import { loadEnv } from 'vite';
import { boxOfficeApi } from './src/lib/boxoffice/server.ts';
// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import https from "node:https";
import url from "node:url";

const tmdbIps = ["99.84.152.32", "99.84.152.53", "99.84.152.8", "99.84.152.85"];
const tmdbLookup = (h: string, o: any, cb: any) => {
  const fn = typeof o === "function" ? o : cb;
  const ip = tmdbIps[Math.floor(Math.random() * tmdbIps.length)];
  if (o && o.all) fn(null, [{ address: ip, family: 4 }]);
  else fn(null, ip, 4);
};

function tmdbProxyPlugin() {
  return {
    name: "tmdb-proxy",
    configureServer(server: any) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ''));
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url?.startsWith('/api/boxoffice/')) return next();
        try {
          let body = ''; for await (const chunk of req) { body += chunk; if(body.length > 1000000) {res.statusCode=413;res.end('Import too large');return;} }
          const request = new Request('http://localhost'+req.url, {method:req.method,headers:req.headers,...(req.method==='POST'?{body}: {})});
          const response = await boxOfficeApi(request); res.statusCode=response.status;
          response.headers.forEach((v,k)=>res.setHeader(k,v));res.end(await response.text());
        } catch {res.statusCode=500;res.end(JSON.stringify({error:'Box-office server unavailable'}));}
      });
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url?.startsWith("/api/tmdb")) return next();
        const parsed = url.parse(req.url, true);
        const tmdbPath = parsed.pathname?.replace(/^\/api\/tmdb/, "") || "";
        const targetUrl = `https://api.themoviedb.org/3${tmdbPath}${parsed.search || ""}`;

        const proxyReq = https.get(
          targetUrl,
          {
            lookup: tmdbLookup,
            headers: {
              "User-Agent": "CineVerse-Client/1.0",
              "Accept": "application/json",
            },
          },
          (proxyRes) => {
            res.writeHead(proxyRes.statusCode || 200, {
              "Content-Type": proxyRes.headers["content-type"] || "application/json",
              "Access-Control-Allow-Origin": "*",
            });
            proxyRes.pipe(res);
          }
        );

        proxyReq.on("error", (err) => {
          console.error("TMDB proxy error:", err.message);
          res.writeHead(502, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Failed to connect to TMDB", message: err.message }));
        });
      });
    },
  };
}

export default defineConfig({
  // Collection review store requires a Node server with a persistent writable volume.
  nitro: { preset: process.env.NITRO_PRESET || (process.env.VERCEL ? 'vercel' : 'node-server') },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [tmdbProxyPlugin()],
  },
});



