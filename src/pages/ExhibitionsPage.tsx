import { useEffect, useState } from 'react'
import Section from '../components/layout/Section'
import GalleryLightbox from '../components/gallery/GalleryLightbox'
import { exhibitionImages } from '../data/exhibitions'
import { useScrollLock } from '../hooks/useScrollLock'

export default function ExhibitionsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useScrollLock(activeIndex !== null)

  useEffect(() => {
    if (activeIndex === null) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev + 1) % exhibitionImages.length
        )
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null
            ? exhibitionImages.length - 1
            : (prev - 1 + exhibitionImages.length) % exhibitionImages.length
        )
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex])

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === null ? 0 : (prev + 1) % exhibitionImages.length
    )
  }

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === null
        ? exhibitionImages.length - 1
        : (prev - 1 + exhibitionImages.length) % exhibitionImages.length
    )
  }

  return (
    <main id="top">
      <Section className="gallery-hero">
        <div className="section-header">
          <div>
            <h2>Exhibitions</h2>
            <p>
              Documentation from recent exhibitions and presentation contexts.
            </p>
          </div>
        </div>
      </Section>

      <Section className="gallery-section">
        <div className="gallery-grid">
          {exhibitionImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className="gallery-card"
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={image.thumb}
                alt={image.alt}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      </Section>

      {activeIndex !== null && (
        <GalleryLightbox
          images={exhibitionImages}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </main>
  )
}
