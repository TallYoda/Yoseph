import {
  CV_FILE_FILENAME,
  CV_FILE_URL,
  education,
  exhibitions,
  prizes,
  projects,
} from '../../data/cv'

type CvGroupProps = {
  title: string
  items: { year: string; text: string }[]
}

function CvGroup({ title, items }: CvGroupProps) {
  return (
    <div className="cv-group">
      <p className="cv-title">{title}</p>
      <ul className="cv-list">
        {items.map((item) => (
          <li key={item.text}>
            <span className="cv-year">{item.year}</span>
            <span className="cv-entry">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CV() {
  return (
    <div className="cv-layout">
      <div className="cv-grid">
        <CvGroup title="Exhibitions" items={exhibitions} />
        <CvGroup title="Education" items={education} />
        <CvGroup title="Projects" items={projects} />
        <CvGroup title="Prizes" items={prizes} />
      </div>
      <a
        className="cv-download"
        href={CV_FILE_URL}
        download={CV_FILE_FILENAME}
        target="_blank"
        rel="noopener noreferrer"
      >
        Download CV
      </a>
    </div>
  )
}
