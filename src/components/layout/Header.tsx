import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/">
          Yosef Atskelewi
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav ${isOpen ? 'is-open' : ''}`}>
          <a href="/#works" onClick={handleClose}>
            Works
          </a>
          <a href="/#about" onClick={handleClose}>
            About
          </a>
          <a href="/#cv" onClick={handleClose}>
            CV
          </a>
          <Link to="/exhibitions" onClick={handleClose}>
            Exhibitions
          </Link>
          <a href="/#contact" onClick={handleClose}>
            Contact
          </a>
          <a
            href="https://yosef-atskelewi-portfolio.my.canva.site/"
            target="_blank"
            rel="noreferrer"
            aria-label="Portfolio link"
            className="icon-link"
            onClick={handleClose}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm10.5 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  )
}
