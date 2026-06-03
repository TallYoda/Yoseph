import CV from '../components/about/CV'
import Section from '../components/layout/Section'

export default function CVSection() {
  return (
    <Section id="cv" className="cv-section">
      <div className="section-header">
        <h2>CV</h2>
      </div>
      <div className="cv-content">
        <CV />
      </div>
    </Section>
  )
}

