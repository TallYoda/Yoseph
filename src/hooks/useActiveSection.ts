import { useEffect, useState } from 'react'

export const SECTION_IDS = [
  'top',
  'works',
  'about',
  'cv',
  'exhibitions',
  'contact',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

function hashToSection(hash: string): SectionId {
  const id = hash.replace('#', '')
  return SECTION_IDS.includes(id as SectionId) ? (id as SectionId) : 'top'
}

export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>(() =>
    hashToSection(window.location.hash),
  )

  useEffect(() => {
    const syncFromHash = () => {
      setActiveSection(hashToSection(window.location.hash))
    }

    window.addEventListener('hashchange', syncFromHash)

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        const id = visible[0]?.target.id as SectionId | undefined
        if (id && SECTION_IDS.includes(id)) {
          setActiveSection(id)
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('hashchange', syncFromHash)
      observer.disconnect()
    }
  }, [])

  return activeSection
}
