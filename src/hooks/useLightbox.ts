import { useEffect, useState } from 'react'
import type { Artwork } from '../types/artwork'

export function useLightbox() {
  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null)

  useEffect(() => {
    if (!activeArtwork) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveArtwork(null)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeArtwork])

  return {
    activeArtwork,
    openArtwork: setActiveArtwork,
    closeArtwork: () => setActiveArtwork(null),
  }
}

