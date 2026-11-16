import { useShowcase } from '../../../contexts/ShowcaseContext'
import { media } from '../../../data/media'
import { PuzzleArt } from '../../illustrations/PuzzleArt'
import { InlineVideo } from '../../media/InlineVideo'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Pressable } from '../../ui/Pressable'
import { Text } from '../../ui/Text'

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
        <Text className="hero-intro">{c.intro}</Text>
        <div className="hero-actions">
          <Button variant="primary" onClick={() => open(0)}>
            {c.watch}
          </Button>
          <a className="button text-button" href="#journey">
            {c.explore}
            <Icon name="arrow" size={18} />
          </a>
        </div>
        <Pressable
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
        </Pressable>
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
        <Pressable
          type="button"
          className="hero-media"
          onClick={() => open(0)}
          aria-label={c.fullscreen}
        >
          {media[0].ready ? (
            <InlineVideo index={0} label={c.heroCaption} />
          ) : (
            <PuzzleArt />
          )}
        </Pressable>
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
