import Section from '../components/layout/Section'
import { artworks } from '../data/artworks'
import { useFilter } from '../hooks/useFilter'
import { useLightbox } from '../hooks/useLightbox'
import { useScrollLock } from '../hooks/useScrollLock'
import FilterBar from '../components/gallery/FilterBar'
import GalleryGrid from '../components/gallery/GalleryGrid'
import Lightbox from '../components/gallery/Lightbox'

export default function WorksSection() {
  const { selectedFilter, setFilter, isFiltering, visibleArtworks } =
    useFilter(artworks)
  const { activeArtwork, openArtwork, closeArtwork } = useLightbox()

  useScrollLock(Boolean(activeArtwork))

  return (
    <Section id="works" className="works">
      <div className="section-header">
        <div>
          <h2>Works</h2>
          <p>
            Paintings, digital works, and installation pieces. Select a category
            to explore each body of work.
          </p>
        </div>
        <FilterBar selected={selectedFilter} onChange={setFilter} />
      </div>

      <GalleryGrid
        artworks={visibleArtworks}
        filter={selectedFilter}
        isFiltering={isFiltering}
        onSelect={openArtwork}
        showInstallationDetails={selectedFilter === 'installation'}
      />

      {activeArtwork && (
        <Lightbox
          artwork={activeArtwork}
          onClose={closeArtwork}
          showDescription={activeArtwork.category === 'installation'}
        />
      )}
    </Section>
  )
}
