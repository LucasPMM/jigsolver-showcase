import { useShowcase } from '../../../contexts/ShowcaseContext'
import { media } from '../../../data/media'
import { PuzzleArt } from '../../illustrations/PuzzleArt'
import { InlineVideo } from '../../media/InlineVideo'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Pressable } from '../../ui/Pressable'
import { ShouldRender } from '../../ui/ShouldRender'
import { Text } from '../../ui/Text'

export const Hero = () => {
  const { lang, c, open, motionPaused, toggleMotion } = useShowcase()

  return (
    <section className="hero section-wrap" id="top">
      <div className="hero-copy">
        <div className="eyebrow">
          <Text as="span" className="status-dot" />
          {c.eyebrow}
        </div>
        <Text as="h1">
          {c.hero}
          <br />
          <Text as="em">{c.heroEm}</Text>
        </Text>
        <Text className="hero-intro">{c.intro}</Text>
        <div className="hero-actions">
          <Button variant="primary" onClick={() => open(0)}>
            {c.watch}
          </Button>
          <Pressable className="button text-button" href="#journey">
            {c.explore}
            <Icon name="arrow" size={18} />
          </Pressable>
        </div>
        <Pressable
          type="button"
          className="motion-toggle"
          aria-pressed={motionPaused}
          onClick={toggleMotion}
        >
          {lang === 'en'
            ? motionPaused
              ? 'Resume animations'
              : 'Pause animations'
            : motionPaused
              ? 'Retomar animações'
              : 'Pausar animações'}
        </Pressable>
        <Text as="span" className="research-badge">
          <Text as="span" />
          {c.researchBadge}
        </Text>
      </div>
      <div className="hero-visual">
        <div className="visual-label">
          <Text as="span" className="mini-dots">
            <i />
            <i />
            <i />
          </Text>
          <Text as="span">JigSolver / workspace</Text>
          <Icon name="expand" size={14} />
        </div>
        <Pressable
          type="button"
          className="hero-media"
          onClick={() => open(0)}
          aria-label={c.fullscreen}
        >
          <ShouldRender if={media[0].ready} fallback={<PuzzleArt />}>
            <InlineVideo index={0} label={c.heroCaption} />
          </ShouldRender>
        </Pressable>
        <div className="visual-footer">
          <Text as="span" className="status-dot" />
          {c.heroCaption}
          <Text as="span" className="media-index">
            01—03
          </Text>
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
