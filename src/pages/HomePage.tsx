import { useLegacyRouteRedirect } from '../hooks/useLegacyRouteRedirect'
import AboutSection from '../sections/AboutSection'
import ContactSection from '../sections/ContactSection'
import CVSection from '../sections/CVSection'
import ExhibitionsSection from '../sections/ExhibitionsSection'
import WorksSection from '../sections/WorksSection'

export default function HomePage() {
  useLegacyRouteRedirect()

  return (
    <main>
      <section id="top" className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Multidisciplinary visual artist</p>
          <h1>
            Yosef Atskelewi is a multidisciplinary artist based in Addis Ababa,
            Ethiopia. His practice blends painting, mixed media, installation, and
            digital approaches to translate emotional states into visual form —
            exploring memory, fragmentation, and transformation through layered
            textures, color rhythms, and material contrasts.
          </h1>
          <p className="lede">
            I work with fragments—of memory, image, material, and place. Through
            layering, erasure, and reconstruction, I seek forms that carry traces
            of lived experience while remaining open to transformation. The work
            exists not as a fixed narrative but as a space where personal and
            collective memory can meet.
          </p>
        </div>
      </section>

      <WorksSection />
      <AboutSection />
      <CVSection />
      <ExhibitionsSection />
      <ContactSection />
    </main>
  )
}
