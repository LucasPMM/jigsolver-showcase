import { useShowcase } from '../../../contexts/ShowcaseContext'
import { Icon } from '../../ui/Icon'
import { Text } from '../../ui/Text'

export const Research = () => {
  const { c } = useShowcase()

  return (
    <section id="research" className="research-section">
      <div className="section-wrap section-pad">
        <div className="section-heading">
          <span className="eyebrow">{c.evidenceEyebrow}</span>
          <h2>{c.evidenceTitle}</h2>
          <Text>{c.evidenceIntro}</Text>
        </div>
        <div className="evidence-grid">
          {c.evidence.map((e) => (
            <article key={e.value}>
              <strong>{e.value}</strong>
              <h3>{e.label}</h3>
              <Text>{e.text}</Text>
            </article>
          ))}
        </div>
        <Text className="evidence-note">
          <Icon name="scan" />
          {c.evidenceNote}
        </Text>
      </div>
    </section>
  )
}
