import HeroMarquee from '../components/home/HeroMarquee'
import { getHeroMarqueeImages } from '../data/heroMarquee'

const marqueeImages = getHeroMarqueeImages()

export default function HomePage() {
  return (
    <main id="top" className="home-page">
      <section className="hero">
        <HeroMarquee images={marqueeImages} />
        <div className="hero-statement">
          <p className="excerpt">
            Yosef Atskelewi is a multidisciplinary artist based in Addis Ababa,
            Ethiopia. His practice blends painting, mixed media, installation,
            and digital approaches to translate emotional states into visual
            form — exploring memory, fragmentation, and transformation through
            layered textures, color rhythms, and material contrasts that invite
            a quiet, wordless dialogue with the viewer.
          </p>
        </div>
      </section>
    </main>
  )
}
