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
        <Text as="span">01 / 04</Text>
        <Text as="span">{c.scroll}</Text>
        <Text as="span">↓</Text>
      </div>
      <section id="journey" className="section-wrap section-pad">
        <div className="section-heading">
          <Text as="span" className="eyebrow">
            {c.journeyEyebrow}
          </Text>
          <Text as="h2">{c.journeyTitle}</Text>
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
              <Text as="span" className="micro-label">
                {s.tag}
              </Text>
              <Text as="h3">{s.title}</Text>
              <Text>{s.text}</Text>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
