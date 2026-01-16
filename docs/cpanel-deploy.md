# Deploying to cPanel (static hosting)

Your cPanel site must serve the **production build output** from Vite (`dist/`). If you upload the repo root `index.html`, it will reference `/src/main.tsx` (development entry) and you’ll get:

> Failed to load module script… MIME type… /src/main.tsx

## Recommended (GitHub Actions → download dist)

This repo includes a GitHub Actions workflow that builds the site and produces a downloadable **dist artifact**.

1. Push to GitHub.
2. Go to **GitHub → Actions**.
3. Select **“Build dist (cPanel)”**.
4. Click **Run workflow** (or open the latest run).
5. Download the artifact named **`dist`**.
6. Unzip it locally.

## Upload to cPanel

1. In cPanel → **File Manager** → open `public_html/`.
2. (Important) Enable **Show Hidden Files** (so you can see `.htaccess`).
3. Delete old deployed files (at minimum):
   - `assets/`
   - `index.html`
   - any accidentally uploaded `src/` folder
4. Upload **ONLY the contents inside** the downloaded `dist/` folder into `public_html/`:
   - `public_html/index.html`
   - `public_html/assets/*`
   - `public_html/.htaccess` (SPA routing)
5. Hard refresh your site (Ctrl+F5) and/or purge any CDN cache.

## Verify (this is the key check)

Open your website → right click → **View Page Source**.

- ✅ Good: you see something like:
  - `<script type="module" src="/assets/index-xxxxx.js"></script>`
- ❌ Wrong: you still see:
  - `<script type="module" src="/src/main.tsx"></script>`

If it’s wrong, the server is still serving the development `index.html` (or an old cached one). Re-upload `dist/index.html` and purge caches.
