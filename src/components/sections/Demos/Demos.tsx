import { useShowcase } from '../../../contexts/ShowcaseContext'
import { media } from '../../../data/media'
import { PuzzleArt } from '../../illustrations/PuzzleArt'
import { InlineVideo } from '../../media/InlineVideo'
import { Icon } from '../../ui/Icon'
import { Pressable } from '../../ui/Pressable'
import { Text } from '../../ui/Text'

export const Demos = () => {
  const { c, open } = useShowcase()

  return (
    <section id="demos" className="section-wrap section-pad">
      <div className="section-heading split-heading">
        <div>
          <span className="eyebrow">{c.demoEyebrow}</span>
          <h2>{c.demoTitle}</h2>
        </div>
        <Text>{c.demoIntro}</Text>
      </div>
      <div className="demo-grid">
        {c.demos.map((d, i) => (
          <Pressable
            type="button"
            className="demo-card"
            aria-label={`${c.fullscreen}: ${d.title}`}
            key={d.title}
            onClick={() => open(i)}
          >
            <div className="demo-image">
              {media[i].ready ? (
                <InlineVideo index={i} label={d.title} />
              ) : (
                <PuzzleArt stage={i} />
              )}
            </div>
            <div className="demo-text">
              <span className="micro-label">{d.category}</span>
              <h3>
                {d.title}
                <Icon name="arrow" />
              </h3>
              <Text>{d.desc}</Text>
            </div>
          </Pressable>
        ))}
      </div>
    </section>
  )
}
