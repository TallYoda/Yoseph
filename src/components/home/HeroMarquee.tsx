type HeroMarqueeProps = {
  images: { src: string; alt: string }[]
}

export default function HeroMarquee({ images }: HeroMarqueeProps) {
  if (images.length === 0) return null

  const loop = [...images, ...images]

  return (
    <div className="hero-marquee" aria-hidden="true">
      <div className="hero-marquee-track">
        {loop.map((image, index) => (
          <figure key={`${image.src}-${index}`} className="hero-marquee-item">
            <img
              src={image.src}
              alt={index < images.length ? image.alt : ''}
              loading={index < images.length ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              onError={(event) => {
                const target = event.currentTarget
                if (target.dataset.fallback) return
                const fallback = target.src.replace('/thumbs/', '/')
                target.dataset.fallback = '1'
                target.src = fallback
              }}
            />
          </figure>
        ))}
      </div>
    </div>
  )
}
