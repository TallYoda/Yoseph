import type { Artwork } from '../../types/artwork'
import ArtworkCard from './ArtworkCard'

type GalleryGridProps = {
  artworks: Artwork[]
  isFiltering: boolean
  onSelect: (artwork: Artwork) => void
}

export default function GalleryGrid({
  artworks,
  isFiltering,
  onSelect,
}: GalleryGridProps) {
  return (
    <div className={`works-grid ${isFiltering ? 'is-filtering' : ''}`}>
      {artworks.map((artwork, index) => {
        const position = index % 5
        const colSpan = position < 2 ? 3 : 2

        return (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          colSpan={colSpan}
          rowSpan={1}
          onClick={() => onSelect(artwork)}
        />
        )
      })}
    </div>
  )
}

