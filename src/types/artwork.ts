export type ArtworkCategory = 'painting' | 'digital' | 'installation'

export type Artwork = {
  id: string
  title: string
  medium: string
  dimensions?: string
  year?: string
  category: ArtworkCategory
  available?: boolean
  thumbnail: string
  full: string
  colSpan: number
  rowSpan: number
}

