import { useEffect, useMemo, useRef, useState } from 'react'
import type { Artwork, ArtworkCategory } from '../types/artwork'

export type FilterValue = 'all' | 'digital' | 'installation'

export function useFilter(artworks: Artwork[]) {
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>('all')
  const [renderFilter, setRenderFilter] = useState<FilterValue>('all')
  const [isFiltering, setIsFiltering] = useState(false)
  const filterTimeout = useRef<number | null>(null)

  const visibleArtworks = useMemo(() => {
    if (renderFilter === 'all') {
      return artworks
    }

    const categoryMap: Record<Exclude<FilterValue, 'all'>, ArtworkCategory> = {
      digital: 'digital',
      installation: 'installation',
    }

    return artworks.filter(
      (artwork) => artwork.category === categoryMap[renderFilter]
    )
  }, [artworks, renderFilter])

  useEffect(() => {
    return () => {
      if (filterTimeout.current !== null) {
        window.clearTimeout(filterTimeout.current)
      }
    }
  }, [])

  const setFilter = (nextFilter: FilterValue) => {
    if (nextFilter === selectedFilter) return
    setSelectedFilter(nextFilter)
    setRenderFilter(nextFilter)
    setIsFiltering(true)
    if (filterTimeout.current !== null) {
      window.clearTimeout(filterTimeout.current)
    }
    filterTimeout.current = window.setTimeout(() => {
      setIsFiltering(false)
    }, 240)
  }

  return {
    selectedFilter,
    setFilter,
    isFiltering,
    visibleArtworks,
  }
}
