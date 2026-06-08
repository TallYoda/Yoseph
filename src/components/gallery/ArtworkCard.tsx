import type { CSSProperties } from 'react'
import type { Artwork } from '../../types/artwork'
import { getArtworkAlt } from '../../utils/image'
import ArtworkOverlay from './ArtworkOverlay'

type ArtworkCardProps = {
  artwork: Artwork
  onClick: () => void
  colSpan?: number
  rowSpan?: number
  showInstallationDetails?: boolean
}

export default function ArtworkCard({
  artwork,
  onClick,
  colSpan,
  rowSpan,
  showInstallationDetails = false,
}: ArtworkCardProps) {
  const columnSpan = colSpan ?? artwork.colSpan
  const rowSpanValue = rowSpan ?? artwork.rowSpan

  return (
    <button
      type="button"
      className={`work-card${showInstallationDetails ? ' work-card--installation' : ''}`}
      style={
        {
          '--col-span': columnSpan,
          '--row-span': rowSpanValue,
        } as CSSProperties
      }
      onClick={onClick}
    >
      <span
        className={
          showInstallationDetails
            ? 'work-installation-layout'
            : 'work-card-layout'
        }
      >
        <span className="work-media">
          <img
            src={artwork.thumbnail}
            alt={getArtworkAlt(artwork)}
            loading="lazy"
            decoding="async"
          />
          {!showInstallationDetails && (
            <ArtworkOverlay
              title={artwork.title}
              medium={artwork.medium}
              dimensions={artwork.dimensions}
            />
          )}
        </span>
        {showInstallationDetails && artwork.description && (
          <span className="work-installation-details">
            <span className="work-title">{artwork.title}</span>
            <span className="work-description">{artwork.description}</span>
          </span>
        )}
      </span>
    </button>
  )
}
