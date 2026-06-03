import Section from '../components/layout/Section'
import Biography from '../components/about/Biography'
import ArtistStatement from '../components/about/ArtistStatement'

export default function AboutSection() {
  return (
    <Section id="about" className="about">
      <div className="section-header">
        <h2>About</h2>
      </div>
      <div className="about-grid">
        <div className="about-left">
          <figure className="about-portrait">
            <img
              src="/about/thumbs/portrait.jpg"
              alt="Yosef Atskelewi"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <Biography />
        </div>
        <ArtistStatement />
      </div>
    </Section>
  )
}

