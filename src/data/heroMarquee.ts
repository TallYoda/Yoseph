export type HeroMarqueeImage = {
  src: string
  alt: string
}

/** Paintings from the dedicated hero folder only (see public/hero). */
export const heroMarqueeImages: HeroMarqueeImage[] = [
  {
    "src": "/hero/thumbs/hero-01.jpg",
    "alt": "Untitled 10"
  },
  {
    "src": "/hero/thumbs/hero-02.jpg",
    "alt": "Untitled 17"
  },
  {
    "src": "/hero/thumbs/hero-03.jpg",
    "alt": "Yosef Atskelewi"
  }
] as HeroMarqueeImage[]

export function getHeroMarqueeImages() {
  return heroMarqueeImages
}
