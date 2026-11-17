import { useShowcase } from '../../../contexts/ShowcaseContext'
import { media } from '../../../data/media'
import { PuzzleArt } from '../../illustrations/PuzzleArt'
import { InlineVideo } from '../../media/InlineVideo'
import { Icon } from '../../ui/Icon'
import { Pressable } from '../../ui/Pressable'
import { ShouldRender } from '../../ui/ShouldRender'
import { Text } from '../../ui/Text'

export const Experience = () => {
  const { device, setDevice, c, open } = useShowcase()
  const selected = media[device === 'desktop' ? 1 : 2]
  return (
    <section id="experience" className="experience-section">
      <div className="section-wrap section-pad">
        <div className="section-heading">
          <Text as="span" className="eyebrow">
            {c.experienceEyebrow}
          </Text>
          <Text as="h2">{c.experienceTitle}</Text>
          <Text>{c.experienceIntro}</Text>
        </div>
        <fieldset className="device-tabs" aria-label={c.experienceTitle}>
          <Pressable
            type="button"
            aria-pressed={device === 'desktop'}
            onClick={() => setDevice('desktop')}
          >
            <Icon name="desktop" />
            {c.desktop}
          </Pressable>
          <Pressable
            type="button"
            aria-pressed={device === 'mobile'}
            onClick={() => setDevice('mobile')}
          >
            <Icon name="phone" />
            {c.mobile}
          </Pressable>
        </fieldset>
        <div className={`experience-panel ${device}`}>
          <div className="experience-media">
            <Pressable
              type="button"
              className="device-frame"
              onClick={() => open(device === 'desktop' ? 1 : 2)}
              aria-label={c.fullscreen}
            >
              <div className="device-top">
                <Text as="span" />
                <Text as="span" />
                <Text as="span" />
              </div>
              <ShouldRender if={selected.ready} fallback={<PuzzleArt />}>
                <InlineVideo
                  key={device}
                  index={device === 'desktop' ? 1 : 2}
                  label={device === 'desktop' ? c.desktopTitle : c.mobileTitle}
                />
              </ShouldRender>
            </Pressable>
          </div>
          <div className="experience-copy">
            <Text as="span" className="micro-label">
              {device === 'desktop' ? 'DESKTOP' : 'MOBILE'}
            </Text>
            <Text as="h3">
              {device === 'desktop' ? c.desktopTitle : c.mobileTitle}
            </Text>
            <Text>{device === 'desktop' ? c.desktopText : c.mobileText}</Text>
            <ul>
              {(device === 'desktop'
                ? c.desktopFeatures
                : c.mobileFeatures
              ).map((f) => (
                <li key={f}>
                  <Text as="span">
                    <Icon name="check" size={16} />
                  </Text>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
