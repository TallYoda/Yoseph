import Section from '../components/layout/Section'
import ContactForm from '../components/contact/ContactForm'

export default function ContactSection() {
  return (
    <Section id="contact" className="contact">
      <div className="section-header">
        <h2>Contact</h2>
        <p>
          For inquiries, commissions, or studio visits, send a note below or
          reach out directly at teklemedhen555@gmail.com / +251 924 356 917.
        </p>
      </div>
      <ContactForm />
    </Section>
  )
}

