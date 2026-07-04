import { useEffect } from 'react'

const LEGACY_PATHS: Record<string, string> = {
  '/works': 'works',
  '/about': 'about',
  '/cv': 'cv',
  '/contact': 'contact',
  '/exhibitions': 'exhibitions',
  '/gallery': 'exhibitions',
}

export function useLegacyRouteRedirect() {
  useEffect(() => {
    const section = LEGACY_PATHS[window.location.pathname]
    if (!section) return

    window.history.replaceState(null, '', `/#${section}`)
    requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView()
    })
  }, [])
}
