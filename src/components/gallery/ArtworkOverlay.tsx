type ArtworkOverlayProps = {
  title: string
  medium: string
  dimensions?: string
}

export default function ArtworkOverlay({
  title,
  medium,
  dimensions,
}: ArtworkOverlayProps) {
  return (
    <span className="work-overlay">
      <span className="work-title">{title}</span>
      <span className="work-meta">
        {dimensions ? `${medium} · ${dimensions}` : medium}
      </span>
    </span>
  )
}

