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

  const categoryMap: Record<Exclude<FilterValue, 'all'>, ArtworkCategory> = {
    digital: 'digital',
    installation: 'installation',
  }

  const category = categoryMap[filter]
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

  return (
    <div className={`works-categories ${isFiltering ? 'is-filtering' : ''}`}>
      {groups.map((group, groupIndex) => (
        <section
          key={group.category}
          className="works-category-group"
          aria-label={group.category}
        >
          <WorksCategoryIntro
            category={group.category}
            isFirst={groupIndex === 0}
          />
          <div className="works-grid">
            {group.artworks.map((artwork, index) => {
              const position = index % 5
              const colSpan = position < 2 ? 3 : 2

              return (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  colSpan={colSpan}
                  rowSpan={1}
                  showInstallationDetails={showInstallationDetails}
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
