import WorksSection from '../sections/WorksSection'
import AboutSection from '../sections/AboutSection'
import ContactSection from '../sections/ContactSection'
import CVSection from '../sections/CVSection'

export default function HomePage() {
  return (
    <main id="top">
      <section className="hero">
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

      <WorksSection />
      <AboutSection />
      <CVSection />
      <ContactSection />
    </main>
  )
}
