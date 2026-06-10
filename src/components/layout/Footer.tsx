import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-name">Yosef Atskelewi</p>
          <p className="footer-tagline">Visual artist · Addis Ababa, Ethiopia</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <Link to="/works">Works</Link>
          <Link to="/about">About</Link>
          <Link to="/cv">CV</Link>
          <Link to="/exhibitions">Exhibitions</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer-contact">
          <a href="mailto:teklemedhen555@gmail.com">teklemedhen555@gmail.com</a>
          <a href="tel:+251924356917">+251 924 356 917</a>
        </div>
      </div>

      <p className="footer-copy">
        © {year} Yosef Atskelewi. All rights reserved.
      </p>
    </footer>
  )
}
