/** Per-artwork metadata overrides keyed by works slug + filename stem. */

/**
 * @typedef {{ medium?: string, size?: string, year?: string }} ArtworkMeta
 */

/** @type {Record<string, ArtworkMeta>} */
export const ARTWORK_META = {
  'paintings/20': {
    medium: 'Acrylic on canvas',
    size: '150 x 150 cm',
    year: '2026',
  },
  'paintings/21': {
    medium: 'Acrylic on canvas',
    size: '150 x 150 cm',
    year: '2026',
  },
  'paintings/22': {
    medium: 'Acrylic on canvas',
    size: '150 x 150 cm',
    year: '2026',
  },
}

/**
 * @param {string} slug
 * @param {string} filename
 * @returns {ArtworkMeta}
 */
export function resolveArtworkMeta(slug, filename) {
  const stem = filename.replace(/\.[^.]+$/, '')
  return ARTWORK_META[`${slug}/${stem}`] ?? {}
}
