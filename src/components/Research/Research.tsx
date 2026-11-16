import { useShowcase } from '../../context/ShowcaseContext'
import { Icon } from '../Icon'

export const Research = () => {
  const { c } = useShowcase()

  return (
    <section id="research" className="research-section">
      <div className="section-wrap section-pad">
        <div className="section-heading">
          <span className="eyebrow">{c.evidenceEyebrow}</span>
          <h2>{c.evidenceTitle}</h2>
          <p>{c.evidenceIntro}</p>
        </div>
        <div className="evidence-grid">
          {c.evidence.map((e) => (
            <article key={e.value}>
              <strong>{e.value}</strong>
              <h3>{e.label}</h3>
              <p>{e.text}</p>
            </article>
          ))}
        </div>
        <p className="evidence-note">
          <Icon name="scan" />
          {c.evidenceNote}
        </p>
      </div>
    </section>
  )
}
