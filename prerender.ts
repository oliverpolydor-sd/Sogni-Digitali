import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The routes we want to statically generate for SEO
const routesToPrerender = [
  '/',
  '/services',
  '/marketing',
  '/packages',
  '/portfolio',
  '/pricing',
  '/book',
  '/affiliate',
  '/terms',
  '/privacy',
  '/legal',
  '/links'
];

async function prerender() {
  console.log('Starting prerendering...');
  
  // Load the server entry (compiled by vite build --ssr)
  const serverEntryPath = path.resolve(__dirname, 'dist/server/entry-server.js');
  let render;
  try {
    const entryModule = await import(serverEntryPath);
    render = entryModule.render;
  } catch (e) {
    console.error("Failed to load SSR entry. Make sure you run 'vite build --ssr' first.", e);
    process.exit(1);
  }

  // Load the base template (compiled by vite build for client)
  const templatePath = path.resolve(__dirname, 'dist/client/index.html');
  let template = fs.readFileSync(templatePath, 'utf-8');

  // Prerender each route
  for (const url of routesToPrerender) {
    const helmetContext = {} as any;
    const appHtml = render(url, helmetContext);
    const { helmet } = helmetContext;

    let html = template.replace(`<!--ssr-outlet-->`, appHtml);

    // Inject helmet SEO
    if (helmet) {
      const helmetData = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      `;
      html = html.replace('</head>', `${helmetData}</head>`);
    }

    // Save the output HTML
    const filePath = path.resolve(__dirname, 'dist/client', url === '/' ? 'index.html' : `${url.substring(1)}.html`);
    
    // Create directory if it doesn't exist (e.g. for /nested/route) -> our routes are flat, but just in case
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, html);
    console.log(`Pre-rendered ${url} -> ${filePath}`);
  }

  console.log('Prerendering complete!');
}

prerender();
