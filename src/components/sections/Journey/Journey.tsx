import { useShowcase } from '../../../contexts/ShowcaseContext'
import { PuzzleArt } from '../../illustrations/PuzzleArt'
import type { IconName } from '../../ui/Icon'
import { Icon } from '../../ui/Icon'
import { Text } from '../../ui/Text'

export const Journey = () => {
  const { c } = useShowcase()

  return (
    <>
      <div className="chapter-line section-wrap">
        <span>01 / 04</span>
        <span>{c.scroll}</span>
        <span>↓</span>
      </div>
      <section id="journey" className="section-wrap section-pad">
        <div className="section-heading">
          <span className="eyebrow">{c.journeyEyebrow}</span>
          <h2>{c.journeyTitle}</h2>
          <Text>{c.journeyIntro}</Text>
        </div>
        <div className="journey-grid">
          {c.steps.map((s, i) => (
            <article className={`journey-card card-${i}`} key={s.tag}>
              <div className="step-visual">
                <PuzzleArt stage={i} />
                <div className="step-icon">
                  <Icon
                    name={(['camera', 'scan', 'grid'] as Array<IconName>)[i]}
                    size={23}
                  />
                </div>
              </div>
              <span className="micro-label">{s.tag}</span>
              <h3>{s.title}</h3>
              <Text>{s.text}</Text>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
