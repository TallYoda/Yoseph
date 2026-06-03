import {
  education,
  exhibitions,
  prizes,
  projects,
} from '../../data/cv'

export default function CV() {
  return (
    <div className="about-block">
      <h3>CV</h3>
      <div className="cv-group">
        <p className="cv-title">Exhibitions</p>
        <ul className="cv-list">
          {exhibitions.map((item) => (
            <li key={item.text}>
              <span>{item.year}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="cv-group">
        <p className="cv-title">Education</p>
        <ul className="cv-list">
          {education.map((item) => (
            <li key={item.text}>
              <span>{item.year}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="cv-group">
        <p className="cv-title">Projects</p>
        <ul className="cv-list">
          {projects.map((item) => (
            <li key={item.text}>
              <span>{item.year}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="cv-group">
        <p className="cv-title">Prizes</p>
        <ul className="cv-list">
          {prizes.map((item) => (
            <li key={item.text}>
              <span>{item.year}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <a className="cv-download" href="/cv/Yosef-Atskelewi-CV.pdf" download>
        Check out my CV
      </a>
    </div>
  )
}

