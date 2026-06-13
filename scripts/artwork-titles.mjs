/** Bilingual titles keyed by works slug + filename stem (without extension). */

function bilingual(amharic, english) {
  if (amharic && english) return `${amharic} · ${english}`
  return amharic || english || ''
}

function englishOnly(text) {
  return text
}

/** @type {Record<string, string>} */
export const ARTWORK_TITLES = {
  // Paintings — main series
  'paintings/1.1': englishOnly('Memories of the Threshold'),
  'paintings/2': bilingual('ከትውስታ በስተጀርባ', 'Beyond Memory'),
  'paintings/5': bilingual('የምሽት ቅኝት', 'Nocturnal Rhythms'),
  'paintings/8': bilingual('የመረጋጋት ጥልቀት', 'Depths of Serenity'),
  'paintings/9': bilingual('የንጋት ትንፋሽ', 'Breath of the Morning'),
  'paintings/10': bilingual('የእርጥበት ስሜት', 'The Moist Rhythm'),
  'paintings/11': bilingual('ረቂቅ አበባ', 'Abstract Blossom'),
  'paintings/12': bilingual('የጥላዎች ዳንስ', 'Dance of Shadows'),
  'paintings/13': bilingual('የጫካው ምስጢር', 'Wild Secrets'),
  'paintings/14': bilingual('የጨለማው ቀይ ጩኸት', 'The Red Cry of the Dark'),
  'paintings/15': bilingual('የብርሃን ስንጥቅ', 'Crack of Light'),
  'paintings/16': bilingual('ረቂቅ አበባ', 'Abstract Blossom'),
  'paintings/17': bilingual('የተመጣጠነ ፍልሚያ', 'A Balanced Conflict'),
  'paintings/18': bilingual('የማለዳ ትግል', 'The Morning Struggle'),
  'paintings/19': bilingual('የውስጥ ብልጭታ', 'Inner Sparks'),

  // Paintings — 30×30 series (paintings2 folder)
  // Series # → file:  1 → 1.png | 2 → 6.jpg | 3 → 7.jpg | 4 → 4.jpg
  'paintings2/1': bilingual('የቀለም ድምፅ', 'Chromatic Resonance'), // 1.png
  'paintings2/6': bilingual('የእርጥበት ስሜት', 'The Moist Rhythm'), // series 2
  'paintings2/7': bilingual('የጭጋግ መስመሮች', 'Fog Lines'), // series 3
  'paintings2/4': bilingual('ስምምነት', 'Resonance'), // series 4

  // Digital art
  'digital-art/IMG_0181': bilingual('የቀለጠች ከተማ', 'Molten Cityscape'),
  'digital-art/IMG_0184': bilingual('የስሜት ግለት', 'Emotional Intensity'),
  'digital-art/IMG_0185': bilingual('ስውር ዲያሎግ', 'Submerged Dialogue'),
  'digital-art/IMG_0186': bilingual('የምሽት ምት', 'Pulse of the Night'),
  'digital-art/IMG_0187': bilingual('የጭጋግ ነፍስ', 'Soul in the Mist'),
  'digital-art/IMG_0188': bilingual('መደራረብ', 'Layers of the Soul'),
  'digital-art/IMG_0189': bilingual('የጥላዎች ዳንስ', 'Dance of Shadows'),
  'digital-art/IMG_0190': bilingual('የተመጣጠነ ፍልሚያ', 'A Balanced Conflict'),
}

export function resolveArtworkTitle(slug, filename, fallbackTitle) {
  const stem = filename.replace(/\.[^.]+$/, '')
  const key = `${slug}/${stem}`
  const keyed = ARTWORK_TITLES[key]
  if (keyed) return keyed

  const lowerKey = `${slug}/${stem.toLowerCase()}`
  if (ARTWORK_TITLES[lowerKey]) return ARTWORK_TITLES[lowerKey]

  return fallbackTitle
}
