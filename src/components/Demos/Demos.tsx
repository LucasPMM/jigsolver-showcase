import { useShowcase } from '../../context/ShowcaseContext'
import { media } from '../../media'
import { Icon } from '../Icon'
import { InlineVideo } from '../InlineVideo'
import { PuzzleArt } from '../PuzzleArt'

export const Demos = () => {
  const { c, open } = useShowcase()

  return (
    <section id="demos" className="section-wrap section-pad">
      <div className="section-heading split-heading">
        <div>
          <span className="eyebrow">{c.demoEyebrow}</span>
          <h2>{c.demoTitle}</h2>
        </div>
        <p>{c.demoIntro}</p>
      </div>
      <div className="demo-grid">
        {c.demos.map((d, i) => (
          <button
            type="button"
            className="demo-card"
            key={d.title}
            onClick={() => open(i)}
          >
            <div className="demo-image">
              {media[i].ready ? (
                <InlineVideo index={i} label={d.title} />
              ) : (
                <PuzzleArt stage={i} />
              )}
              <span className="demo-play">
                <Icon name="play" />
              </span>
              {media[i].duration && (
                <span className="duration">{media[i].duration}</span>
              )}
            </div>
            <div className="demo-text">
              <span className="micro-label">{d.category}</span>
              <h3>
                {d.title}
                <Icon name="arrow" />
              </h3>
              <p>{d.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
