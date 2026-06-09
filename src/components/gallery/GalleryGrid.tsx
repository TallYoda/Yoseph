import type { FilterValue } from '../../hooks/useFilter'
import type { Artwork, ArtworkCategory } from '../../types/artwork'
import ArtworkCard from './ArtworkCard'
import WorksCategoryIntro from './WorksCategoryIntro'

type GalleryGridProps = {
  artworks: Artwork[]
  filter: FilterValue
  isFiltering: boolean
  onSelect: (artwork: Artwork) => void
  showInstallationDetails?: boolean
}

const CATEGORY_ORDER: ArtworkCategory[] = [
  'painting',
  'digital',
  'installation',
]

type CategoryGroup = {
  category: ArtworkCategory
  artworks: Artwork[]
}

function buildCategoryGroups(
  artworks: Artwork[],
  filter: FilterValue,
): CategoryGroup[] {
  if (filter === 'forSale') {
    return artworks.length > 0 ? [{ category: 'painting', artworks }] : []
  }

  if (filter === 'all') {
    const groups: CategoryGroup[] = []

    for (const category of CATEGORY_ORDER) {
      const categoryArtworks = artworks.filter(
        (artwork) => artwork.category === category,
      )
      if (categoryArtworks.length > 0) {
        groups.push({ category, artworks: categoryArtworks })
      }
    }

    return groups
  }

  const category = filter === 'digital' ? 'digital' : 'installation'
  if (artworks.length === 0) return []

  return [{ category, artworks }]
}

export default function GalleryGrid({
  artworks,
  filter,
  isFiltering,
  onSelect,
  showInstallationDetails = false,
}: GalleryGridProps) {
  const groups = buildCategoryGroups(artworks, filter)
  const hideCategoryIntros = filter === 'forSale'

  return (
    <div className={`works-categories ${isFiltering ? 'is-filtering' : ''}`}>
      {groups.map((group, groupIndex) => (
        <section
          key={hideCategoryIntros ? 'for-sale' : group.category}
          className="works-category-group"
          aria-label={hideCategoryIntros ? 'Available for sale' : group.category}
        >
          {!hideCategoryIntros && (
            <WorksCategoryIntro
              category={group.category}
              isFirst={groupIndex === 0}
            />
          )}
          <div className="portfolio-grid">
            {group.artworks.map((artwork, artworkIndex) => {
              const isInstallationGroup = group.category === 'installation'
              const showDetails =
                !hideCategoryIntros &&
                (isInstallationGroup || showInstallationDetails)
              const isInstallationPair =
                isInstallationGroup &&
                group.artworks.length >= 2 &&
                artworkIndex >= group.artworks.length - 2

              return (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  showInstallationDetails={showDetails}
                  installationPair={isInstallationPair}
                  onClick={() => onSelect(artwork)}
                />
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
