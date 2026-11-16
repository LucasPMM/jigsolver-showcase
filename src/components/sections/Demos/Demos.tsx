import { useShowcase } from '../../../contexts/ShowcaseContext'
import { media } from '../../../data/media'
import { PuzzleArt } from '../../illustrations/PuzzleArt'
import { InlineVideo } from '../../media/InlineVideo'
import { Icon } from '../../ui/Icon'
import { Pressable } from '../../ui/Pressable'
import { ShouldRender } from '../../ui/ShouldRender'
import { Text } from '../../ui/Text'

export const Demos = () => {
  const { c, open } = useShowcase()

  return (
    <section id="demos" className="section-wrap section-pad">
      <div className="section-heading split-heading">
        <div>
          <Text as="span" className="eyebrow">
            {c.demoEyebrow}
          </Text>
          <Text as="h2">{c.demoTitle}</Text>
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
              <ShouldRender
                if={media[i].ready}
                fallback={<PuzzleArt stage={i} />}
              >
                <InlineVideo index={i} label={d.title} />
              </ShouldRender>
            </div>
            <div className="demo-text">
              <Text as="span" className="micro-label">
                {d.category}
              </Text>
              <Text as="h3">
                {d.title}
                <Icon name="arrow" />
              </Text>
              <Text>{d.desc}</Text>
            </div>
          </Pressable>
        ))}
      </div>
    </section>
  )
}
