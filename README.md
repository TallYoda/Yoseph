# Yosef Atskelewi — Portfolio

Vite + React portfolio site.

## Development

```bash
npm install
npm run dev
```

## Assets

After adding images to the source folder, regenerate thumbnails and data:

```bash
npm run process-assets
```

## Deploy on Vercel

Import this repository in [Vercel](https://vercel.com). Default settings work:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

Routes: `/` (home marquee), `/works`, `/about`, `/cv`, `/contact`, `/exhibitions`. Client-side routing is handled via `vercel.json` rewrites (paths with file extensions such as `.pdf` are served as static files).

Place the latest CV PNG in the source `cv` folder; `npm run process-assets` copies it to `public/cv/Yosef-Atskelewi-CV.png`.
