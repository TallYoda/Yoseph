import { useScrollToHash } from '../hooks/useScrollToHash'
import WorksSection from '../sections/WorksSection'
import AboutSection from '../sections/AboutSection'
import CVSection from '../sections/CVSection'
import ContactSection from '../sections/ContactSection'

export default function HomePage() {
  useScrollToHash()

  return (
    <main id="top" className="home-page">
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Multidisciplinary visual artist</p>
          <h1>
            Yosef Atskelewi is a multidisciplinary artist based in Addis Ababa,
            Ethiopia. His practice blends painting, mixed media, installation,
            and digital approaches to translate emotional states into visual
            form — exploring memory, fragmentation, and transformation through
            layered textures, color rhythms, and material contrasts.
          </h1>
          <p className="lede">
            Each piece invites a quiet, wordless dialogue with the viewer — a
            space where emotion leads the process and form emerges from lived
            experience.
          </p>
        </div>
      </section>

      <WorksSection />
      <AboutSection />
      <CVSection />
      <ContactSection />
    </main>
  )
}
