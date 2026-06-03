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

Client-side routes (`/exhibitions`, `/gallery`) are handled via `vercel.json` rewrites.
