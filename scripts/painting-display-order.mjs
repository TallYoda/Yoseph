import path from 'node:path'

/**
 * Curated painting display order (filename stems, no extension).
 * Paintings are grouped by vibe; strongest pieces lead each section.
 *
 * Groups (main /paintings):
 *  1. Featured — lush & high-impact openers
 *  2. Nocturnal urban — dark ground, yellow/orange light
 *  3. Luminous nature — greens, organic light
 *  4. Structured energy — grids, blocks, layered marks
 *  5. Bold graphic red
 *
 * paintings2 = 30×30 series (shown after main paintings)
 */

export const PAINTINGS_DISPLAY_ORDER = [
  // Featured
  '8',
  '1.1',
  '16',
  '14',
  // Nocturnal urban
  '5',
  '6',
  '9',
  '15',
  '12',
  '13',
  // Luminous nature
  '11',
  '17',
  '18',
  // Structured energy
  '2',
  '19',
  // Bold graphic red
  '10',
]

/** 30×30 — best-first within the small-format cluster */
export const PAINTINGS2_DISPLAY_ORDER = ['1', '7', '4', '6']

const ORDER_BY_SLUG = {
  paintings: PAINTINGS_DISPLAY_ORDER,
  paintings2: PAINTINGS2_DISPLAY_ORDER,
}

export function sortImagesForSource(slug, images) {
  const order = ORDER_BY_SLUG[slug]
  if (!order) {
    return [...images].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true }),
    )
  }

  return [...images].sort((a, b) => {
    const stemA = path.parse(a).name
    const stemB = path.parse(b).name
    const indexA = order.indexOf(stemA)
    const indexB = order.indexOf(stemB)

    if (indexA === -1 && indexB === -1) {
      return a.localeCompare(b, undefined, { numeric: true })
    }
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })
}
