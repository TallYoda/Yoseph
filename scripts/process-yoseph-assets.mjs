import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { resolveArtworkTitle } from './artwork-titles.mjs'
import { sortImagesForSource } from './painting-display-order.mjs'

const SOURCE = 'C:\\Users\\15879\\Documents\\Abel\\Availables\\yoseph'
const PUBLIC = path.resolve('public')
const THUMB_WIDTH = 600
const THUMB_QUALITY = 72

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG'])

const WORK_SOURCES = [
  {
    slug: 'paintings',
    sourceDir: 'Paintings',
    category: 'painting',
    skip: new Set(['yoseph.jpg']),
  },
  {
    slug: 'paintings2',
    sourceDir: 'Paintings2',
    category: 'painting',
    skip: new Set(),
  },
  {
    slug: 'digital-art',
    sourceDir: 'Digital Art',
    category: 'digital',
    skip: new Set(),
  },
  {
    slug: 'installation',
    sourceDir: 'installation',
    category: 'installation',
    skip: new Set(),
  },
]

const EXHIBITION_SOURCE = {
  slug: 'exhibitions',
  sourceDir: 'exhibition',
}

function parseDescription(content) {
  const meta = {}
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^([^:]+):\s*(.+)$/)
    if (match) {
      meta[match[1].trim().toLowerCase()] = match[2].trim()
    }
  }
  return meta
}

async function readDescription(dir) {
  for (const name of ['descriptions.txt', 'Description.txt', 'details.txt']) {
    const filePath = path.join(dir, name)
    try {
      const content = await fs.readFile(filePath, 'utf8')
      return parseDescription(content)
    } catch {
      // try next filename
    }
  }
  return {}
}

async function readCategoryIntro(dir) {
  const filePath = path.join(dir, 'Description2.txt')
  try {
    const content = await fs.readFile(filePath, 'utf8')
    return content.replace(/\s+/g, ' ').trim()
  } catch {
    return undefined
  }
}

async function readInstallationDescriptions(dir) {
  for (const name of ['descriptions.txt', 'Description.txt', 'details.txt']) {
    const filePath = path.join(dir, name)
    try {
      const content = await fs.readFile(filePath, 'utf8')
      return parseInstallationDescriptions(content)
    } catch {
      // try next filename
    }
  }
  return {}
}

function parseInstallationDescriptions(content) {
  const descriptions = {}
  let currentKey = null
  let currentText = []

  const flush = () => {
    if (currentKey) {
      descriptions[currentKey] = currentText.join(' ').replace(/\s+/g, ' ').trim()
    }
  }

  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^Installation\s+(\d+)\s*-\s*(.*)$/i)
    if (match) {
      flush()
      currentKey = match[1].padStart(2, '0')
      const rest = match[2].trim()
      currentText = rest ? [rest] : []
    } else if (currentKey && line.trim()) {
      currentText.push(line.trim())
    }
  }

  flush()
  return descriptions
}

function installationNumberFromFilename(filename) {
  const match = path.parse(filename).name.match(/Installation\s+(\d+)/i)
  return match ? match[1].padStart(2, '0') : null
}

function titleFromFilename(filename) {
  const base = path.parse(filename).name
  if (/^\d+(\.\d+)?$/.test(base)) return `Untitled ${base}`
  if (/^IMG_\d+$/i.test(base)) return `Work ${base.replace(/^IMG_/i, '')}`
  return base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function formatPriority(ext) {
  const normalized = ext.toLowerCase()
  if (normalized === '.jpg' || normalized === '.jpeg') return 0
  if (normalized === '.png') return 1
  if (normalized === '.webp') return 2
  return 99
}

function dedupeImagesByBasename(entries) {
  const byBase = new Map()

  for (const name of entries) {
    const base = path.parse(name).name.toLowerCase()
    const current = byBase.get(base)
    if (
      !current ||
      formatPriority(path.extname(name)) < formatPriority(path.extname(current))
    ) {
      byBase.set(base, name)
    }
  }

  return [...byBase.values()].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  )
}

function thumbNameFor(filename) {
  return filename.replace(/\.png$/i, '.jpg')
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function copyAndThumb(sourceFile, destDir, thumbDir) {
  const filename = path.basename(sourceFile)
  const destFile = path.join(destDir, filename)
  const thumbFile = path.join(thumbDir, thumbNameFor(filename))

  await fs.copyFile(sourceFile, destFile)

  const pipeline = sharp(sourceFile).rotate().resize({
    width: THUMB_WIDTH,
    withoutEnlargement: true,
  })

  if (/\.png$/i.test(filename)) {
    await pipeline.jpeg({ quality: THUMB_QUALITY, mozjpeg: true }).toFile(thumbFile)
  } else {
    await pipeline.jpeg({ quality: THUMB_QUALITY, mozjpeg: true }).toFile(thumbFile)
  }

  return { filename, thumbName: path.basename(thumbFile) }
}

async function processWorks() {
  const artworks = []

  for (const source of WORK_SOURCES) {
    const sourcePath = path.join(SOURCE, source.sourceDir)
    const destDir = path.join(PUBLIC, 'works', source.slug)
    const thumbDir = path.join(destDir, 'thumbs')
    await ensureDir(destDir)
    await ensureDir(thumbDir)

    const meta = await readDescription(sourcePath)
    const installationDescriptions =
      source.category === 'installation'
        ? await readInstallationDescriptions(sourcePath)
        : {}
    const medium = meta.medium ?? (source.category === 'installation' ? 'Installation Art' : 'Painting')
    const dimensions = meta.size
    const year = meta.year

    const entries = await fs.readdir(sourcePath)
    const candidateImages = entries
      .filter((name) => IMAGE_EXT.has(path.extname(name)))
      .filter((name) => !source.skip.has(name))
    const images = sortImagesForSource(
      source.slug,
      dedupeImagesByBasename(candidateImages),
    )
    const skippedImages = candidateImages.filter((name) => !images.includes(name))

    for (const image of skippedImages) {
      await fs.unlink(path.join(destDir, image)).catch(() => {})
      await fs.unlink(path.join(thumbDir, thumbNameFor(image))).catch(() => {})
    }

    for (const image of images) {
      const sourceFile = path.join(sourcePath, image)
      const { filename, thumbName } = await copyAndThumb(sourceFile, destDir, thumbDir)
      const id = `${source.slug}-${filename}`.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/\./g, '-')

      const pieceNumber = installationNumberFromFilename(filename)
      const description =
        pieceNumber && installationDescriptions[pieceNumber]
          ? installationDescriptions[pieceNumber]
          : undefined

      const entry = {
        id,
        title: resolveArtworkTitle(
          source.slug,
          filename,
          titleFromFilename(filename),
        ),
        medium,
        dimensions,
        year,
        category: source.category,
        available: true,
        thumbnail: `/works/${source.slug}/thumbs/${thumbName}`,
        full: `/works/${source.slug}/${filename}`,
        colSpan: 2,
        rowSpan: 1,
      }

      if (description) {
        entry.description = description
      }

      artworks.push(entry)
    }
  }

  return artworks
}

async function processExhibitions() {
  const sourcePath = path.join(SOURCE, EXHIBITION_SOURCE.sourceDir)
  const destDir = path.join(PUBLIC, 'exhibitions')
  const thumbDir = path.join(destDir, 'thumbs')
  await ensureDir(destDir)
  await ensureDir(thumbDir)

  const meta = await readDescription(sourcePath)
  const images = []

  const entries = await fs.readdir(sourcePath)
  const files = entries
    .filter((name) => IMAGE_EXT.has(path.extname(name)))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  for (const [index, image] of files.entries()) {
    const sourceFile = path.join(sourcePath, image)
    const { filename, thumbName } = await copyAndThumb(sourceFile, destDir, thumbDir)
    images.push({
      id: `ex-${index + 1}`,
      src: `/exhibitions/${filename}`,
      thumb: `/exhibitions/thumbs/${thumbName}`,
      alt: meta.title ? `${meta.title} — photo ${index + 1}` : `Exhibition photo ${index + 1}`,
    })
  }

  return images
}

function toTsArray(data, exportName, typeImport) {
  const body = JSON.stringify(data, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'")

  if (typeImport) {
    return `${typeImport}\n\nexport const ${exportName} = ${body} as const\n`
  }

  return `export const ${exportName} = ${body} as const\n`
}

const HERO_FULL_WIDTH = 1400
const HERO_FULL_QUALITY = 85
const HERO_MARQUEE_WIDTH = 960
const HERO_MARQUEE_QUALITY = 78

async function processHero() {
  const sourcePath = path.join(SOURCE, 'hero')
  const destDir = path.join(PUBLIC, 'hero')
  const thumbDir = path.join(destDir, 'thumbs')
  await ensureDir(destDir)
  await ensureDir(thumbDir)

  for (const stale of await fs.readdir(destDir)) {
    if (stale === 'thumbs') continue
    await fs.unlink(path.join(destDir, stale)).catch(() => {})
  }
  for (const stale of await fs.readdir(thumbDir)) {
    await fs.unlink(path.join(thumbDir, stale)).catch(() => {})
  }

  const entries = await fs.readdir(sourcePath)
  const images = entries
    .filter((name) => IMAGE_EXT.has(path.extname(name)))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  const marquee = []

  for (const [index, image] of images.entries()) {
    const sourceFile = path.join(sourcePath, image)
    const outputName = `hero-${String(index + 1).padStart(2, '0')}.jpg`
    const destFile = path.join(destDir, outputName)
    const thumbFile = path.join(thumbDir, outputName)

    await sharp(sourceFile)
      .rotate()
      .resize({ width: HERO_FULL_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: HERO_FULL_QUALITY, mozjpeg: true })
      .toFile(destFile)

    await sharp(destFile)
      .resize({ width: HERO_MARQUEE_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: HERO_MARQUEE_QUALITY, mozjpeg: true })
      .toFile(thumbFile)

    const base = path.parse(image).name
    const alt =
      base.toLowerCase() === 'yoseph' ? 'Yosef Atskelewi' : `Untitled ${base}`

    marquee.push({
      src: `/hero/thumbs/${outputName}`,
      alt,
    })
  }

  const heroTs = `export type HeroMarqueeImage = {
  src: string
  alt: string
}

/** Paintings from the dedicated hero folder only (see public/hero). */
export const heroMarqueeImages: HeroMarqueeImage[] = ${JSON.stringify(marquee, null, 2)} as HeroMarqueeImage[]

export function getHeroMarqueeImages() {
  return heroMarqueeImages
}
`

  await fs.writeFile(path.resolve('src/data/heroMarquee.ts'), heroTs)
  console.log(`Updated ${marquee.length} hero marquee images.`)
}

const CV_OUTPUT_NAME = 'Yosef-Atskelewi-CV.png'

async function processCv() {
  const sourceDir = path.join(SOURCE, 'cv')
  const destDir = path.join(PUBLIC, 'cv')
  await ensureDir(destDir)

  const entries = await fs.readdir(sourceDir)
  const png = entries.find((name) => /\.png$/i.test(name))
  if (!png) {
    console.warn('No PNG found in cv folder.')
    return
  }

  await fs.copyFile(path.join(sourceDir, png), path.join(destDir, CV_OUTPUT_NAME))
  console.log(`Updated CV: ${CV_OUTPUT_NAME}`)
}

async function processWorkSections() {
  const digitalIntro = await readCategoryIntro(path.join(SOURCE, 'Digital Art'))
  const installationIntro = await readCategoryIntro(path.join(SOURCE, 'installation'))

  const sections = {
    painting: { title: 'Paintings' },
    digital: {
      title: 'Digital Art',
      ...(digitalIntro ? { description: digitalIntro } : {}),
    },
    installation: {
      title: 'Installation Art',
      ...(installationIntro ? { description: installationIntro } : {}),
    },
  }

  const workSectionsTs = `import type { ArtworkCategory } from '../types/artwork'

export type WorkSection = {
  title: string
  description?: string
}

export const workSections: Record<ArtworkCategory, WorkSection> = ${JSON.stringify(sections, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'")} as Record<ArtworkCategory, WorkSection>
`

  await fs.writeFile(path.resolve('src/data/workSections.ts'), workSectionsTs)
  console.log('Updated work section intros.')
}

async function processPortrait() {
  const portraitDir = path.join(SOURCE, 'portrait')
  const destDir = path.join(PUBLIC, 'about')
  const thumbDir = path.join(destDir, 'thumbs')
  await ensureDir(destDir)
  await ensureDir(thumbDir)

  const entries = await fs.readdir(portraitDir)
  const image = entries.find((name) => IMAGE_EXT.has(path.extname(name)))
  if (!image) {
    console.warn('No portrait image found in portrait folder.')
    return
  }

  const sourceFile = path.join(portraitDir, image)
  await fs.copyFile(sourceFile, path.join(destDir, 'portrait.jpg'))
  await sharp(sourceFile)
    .rotate()
    .resize({ width: 480, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(thumbDir, 'portrait.jpg'))

  console.log('Updated portrait.')
}

async function main() {
  const artworks = await processWorks()
  const exhibitions = await processExhibitions()
  await processHero()
  await processPortrait()
  await processCv()
  await processWorkSections()

  await fs.writeFile(
    path.resolve('src/data/artworks.generated.ts'),
    toTsArray(
      artworks,
      'artworks',
      "import type { Artwork } from '../types/artwork'\n\nexport const artworks: Artwork[]",
    ).replace('export const artworks: Artwork[] =', 'export const artworks: Artwork[] ='),
  )

  // Fix the generated file format properly
  const artworksTs = `import type { Artwork } from '../types/artwork'

export const artworks: Artwork[] = ${JSON.stringify(artworks, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'")} as Artwork[]
`

  const exhibitionsTs = `export type ExhibitionImage = {
  id: string
  src: string
  thumb: string
  alt: string
}

export const exhibitionImages: ExhibitionImage[] = ${JSON.stringify(exhibitions, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'")} as ExhibitionImage[]
`

  await fs.writeFile(path.resolve('src/data/artworks.generated.ts'), artworksTs)
  await fs.writeFile(path.resolve('src/data/exhibitions.ts'), exhibitionsTs)

  console.log(`Processed ${artworks.length} artworks and ${exhibitions.length} exhibition images.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
