import { useShowcase } from '../../context/ShowcaseContext'
import { media } from '../../media'
import { Icon } from '../Icon'
import { InlineVideo } from '../InlineVideo'
import { PuzzleArt } from '../PuzzleArt'

export const Hero = () => {
  const { lang, c, open, motionPaused, setMotionPaused } = useShowcase()

  return (
    <section className="hero section-wrap" id="top">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" />
          {c.eyebrow}
        </div>
        <h1>
          {c.hero}
          <br />
          <em>{c.heroEm}</em>
        </h1>
        <p className="hero-intro">{c.intro}</p>
        <div className="hero-actions">
          <button
            type="button"
            className="button primary"
            onClick={() => open(0)}
          >
            <Icon name="play" size={18} />
            {c.watch}
          </button>
          <a className="button text-button" href="#journey">
            {c.explore}
            <Icon name="arrow" size={18} />
          </a>
        </div>
        <button
          type="button"
          className="motion-toggle"
          aria-pressed={motionPaused}
          onClick={() => setMotionPaused(!motionPaused)}
        >
          {lang === 'en'
            ? motionPaused
              ? 'Resume animations'
              : 'Pause animations'
            : motionPaused
              ? 'Retomar animações'
              : 'Pausar animações'}
        </button>
        <span className="research-badge">
          <span />
          {c.researchBadge}
        </span>
      </div>
      <div className="hero-visual">
        <div className="visual-label">
          <span className="mini-dots">
            <i />
            <i />
            <i />
          </span>
          <span>JigSolver / workspace</span>
          <Icon name="expand" size={14} />
        </div>
        <button
          type="button"
          className="hero-media"
          onClick={() => open(0)}
          aria-label={c.play}
        >
          {media[0].ready ? (
            <InlineVideo index={0} label={c.heroCaption} />
          ) : (
            <PuzzleArt />
          )}
          <span className="floating-play">
            <Icon name="play" size={26} />
          </span>
        </button>
        <div className="visual-footer">
          <span className="status-dot" />
          {c.heroCaption}
          <span className="media-index">01—03</span>
        </div>
        <div className="floating-note">
          <Icon name="puzzle" />{' '}
          {lang === 'en'
            ? 'One piece. A new possibility.'
            : 'Uma peça. Uma nova possibilidade.'}
        </div>
      </div>
    </section>
  )
}
