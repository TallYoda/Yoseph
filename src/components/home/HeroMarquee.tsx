import { useEffect, useRef, useState } from 'react'

type HeroMarqueeProps = {
  images: { src: string; alt: string }[]
}

function parseCssDuration(value: string, fallbackMs: number) {
  const trimmed = value.trim()
  if (!trimmed) return fallbackMs
  if (trimmed.endsWith('ms')) return Number.parseFloat(trimmed)
  if (trimmed.endsWith('s')) return Number.parseFloat(trimmed) * 1000
  return fallbackMs
}

function preloadHeroImage(src: string) {
  return new Promise<string>((resolve) => {
    const image = new Image()
    image.onload = () => resolve(src)
    image.onerror = () => {
      const fallback = src.replace('/thumbs/', '/')
      if (fallback === src) {
        resolve(src)
        return
      }

      const fallbackImage = new Image()
      fallbackImage.onload = () => resolve(fallback)
      fallbackImage.onerror = () => resolve(fallback)
      fallbackImage.src = fallback
    }
    image.src = src
  })
}

function HeroImage({
  src,
  alt,
  hidden,
}: {
  src: string
  alt: string
  hidden?: boolean
}) {
  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      draggable={false}
      aria-hidden={hidden || undefined}
    />
  )
}

export default function HeroMarquee({ images }: HeroMarqueeProps) {
  const [isReady, setIsReady] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const slideshowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (images.length === 0) {
      setIsReady(true)
      return
    }

    let cancelled = false

    Promise.all(images.map((image) => preloadHeroImage(image.src))).then(() => {
      if (!cancelled) setIsReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [images])

  useEffect(() => {
    if (!isReady || images.length <= 1) return

    const root = slideshowRef.current
    if (!root) return

    const media = window.matchMedia('(max-width: 720px)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const tick = () => {
      if (!media.matches || motion.matches) return
      const styles = getComputedStyle(root)
      const holdMs = parseCssDuration(
        styles.getPropertyValue('--slide-interval'),
        4000
      )
      return window.setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % images.length)
      }, holdMs)
    }

    let intervalId = tick()

    const refresh = () => {
      if (intervalId) window.clearInterval(intervalId)
      intervalId = tick()
    }

    media.addEventListener('change', refresh)
    motion.addEventListener('change', refresh)

    return () => {
      if (intervalId) window.clearInterval(intervalId)
      media.removeEventListener('change', refresh)
      motion.removeEventListener('change', refresh)
    }
  }, [images.length, isReady])

  if (images.length === 0) return null

  const loop = [...images, ...images]

  return (
    <div className="hero-media">
      {!isReady && (
        <div className="hero-loading" aria-live="polite" aria-busy="true">
          <span className="hero-loading-label">Loading</span>
        </div>
      )}

      {isReady && (
        <>
          <div className="hero-marquee" aria-hidden="true">
            <div className="hero-marquee-track">
              {loop.map((image, index) => (
                <figure
                  key={`${image.src}-${index}`}
                  className="hero-marquee-item"
                >
                  <HeroImage
                    src={image.src}
                    alt={index < images.length ? image.alt : ''}
                    hidden={index >= images.length}
                  />
                </figure>
              ))}
            </div>
          </div>

          <div
            ref={slideshowRef}
            className="hero-slideshow"
            aria-live="polite"
            aria-label="Featured paintings"
          >
            {images.map((image, index) => (
              <figure
                key={image.src}
                className={`hero-slideshow-slide${index === activeIndex ? ' is-active' : ''}`}
              >
                <HeroImage src={image.src} alt={image.alt} />
              </figure>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
