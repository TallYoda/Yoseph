import { workSections } from '../../data/workSections'
import type { ArtworkCategory } from '../../types/artwork'

type WorksCategoryIntroProps = {
  category: ArtworkCategory
  isFirst?: boolean
}

const FEATURED_INTRO_CATEGORIES = new Set<ArtworkCategory>([
  'digital',
  'installation',
])

export default function WorksCategoryIntro({
  category,
  isFirst = false,
}: WorksCategoryIntroProps) {
  const section = workSections[category]
  const isFeaturedIntro = FEATURED_INTRO_CATEGORIES.has(category)

  return (
    <div
      className={[
        'works-category-intro',
        isFirst ? 'works-category-intro--first' : '',
        isFeaturedIntro ? 'works-category-intro--featured' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <h3>{section.title}</h3>
      {section.description && <p>{section.description}</p>}
    </div>
  )
}
