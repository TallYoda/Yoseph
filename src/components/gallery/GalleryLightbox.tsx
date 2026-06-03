import { useEffect, useState } from 'react'
import type { ExhibitionImage } from '../../data/exhibitions'

type GalleryLightboxProps = {
  images: ExhibitionImage[]
  activeIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  const image = images[activeIndex]
  const [fullSrc, setFullSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setFullSrc(null)
    setIsLoading(true)

    const loader = new Image()
    loader.src = image.src
    loader.onload = () => {
      setFullSrc(image.src)
      setIsLoading(false)
    }
    loader.onerror = () => setIsLoading(false)

    return () => {
      loader.onload = null
      loader.onerror = null
    }
  }, [image.src])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Exhibition image"
      onClick={onClose}
    >
      <div
        className="lightbox-content gallery-lightbox"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="lightbox-close" onClick={onClose}>
          Close
        </button>
        <div className="gallery-lightbox-body">
          <button
            type="button"
            className="gallery-nav prev"
            onClick={onPrev}
            aria-label="Previous image"
          >
            ‹
          </button>
          <div className="lightbox-image-wrap">
            <img
              src={fullSrc ?? image.thumb}
              alt={image.alt}
              className={fullSrc ? 'is-full' : 'is-preview'}
            />
            {isLoading && !fullSrc && (
              <span className="lightbox-loading" aria-live="polite">
                Loading…
              </span>
            )}
          </div>
          <button
            type="button"
            className="gallery-nav next"
            onClick={onNext}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}
