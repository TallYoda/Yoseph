import type { CSSProperties } from 'react'
import type { Artwork } from '../../types/artwork'
import { getArtworkAlt } from '../../utils/image'
import ArtworkOverlay from './ArtworkOverlay'

type ArtworkCardProps = {
  artwork: Artwork
  onClick: () => void
  colSpan?: number
  rowSpan?: number
}

export default function ArtworkCard({
  artwork,
  onClick,
  colSpan,
  rowSpan,
}: ArtworkCardProps) {
  const columnSpan = colSpan ?? artwork.colSpan
  const rowSpanValue = rowSpan ?? artwork.rowSpan

  return (
    <button
      type="button"
      className="work-card"
      style={
        {
          '--col-span': columnSpan,
          '--row-span': rowSpanValue,
        } as CSSProperties
      }
      onClick={onClick}
    >
      <span className="work-media">
        <img
          src={artwork.thumbnail}
          alt={getArtworkAlt(artwork)}
          loading="lazy"
          decoding="async"
        />
      </span>
      <ArtworkOverlay
        title={artwork.title}
        medium={artwork.medium}
        dimensions={artwork.dimensions}
      />
    </button>
  )
}

