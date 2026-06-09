import { useEffect, useMemo, useRef, useState } from 'react'
import type { Artwork, ArtworkCategory } from '../types/artwork'

export type FilterValue =
  | 'all'
  | 'digital'
  | 'installation'
  | 'forSale'

const CATEGORY_FILTERS: Record<
  Exclude<FilterValue, 'all' | 'forSale'>,
  ArtworkCategory
> = {
  digital: 'digital',
  installation: 'installation',
}

export function useFilter(artworks: Artwork[]) {
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>('all')
  const [renderFilter, setRenderFilter] = useState<FilterValue>('all')
  const [isFiltering, setIsFiltering] = useState(false)
  const filterTimeout = useRef<number | null>(null)

  const visibleArtworks = useMemo(() => {
    if (renderFilter === 'all') {
      return artworks
    }

    if (renderFilter === 'forSale') {
      return artworks.filter((artwork) => artwork.available)
    }

    return artworks.filter(
      (artwork) => artwork.category === CATEGORY_FILTERS[renderFilter],
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
