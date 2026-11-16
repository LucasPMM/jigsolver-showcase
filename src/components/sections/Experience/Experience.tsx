import { useShowcase } from '../../../contexts/ShowcaseContext'
import { media } from '../../../data/media'
import { PuzzleArt } from '../../illustrations/PuzzleArt'
import { InlineVideo } from '../../media/InlineVideo'
import { Icon } from '../../ui/Icon'
import { Pressable } from '../../ui/Pressable'
import { Text } from '../../ui/Text'

export const Experience = () => {
  const { device, setDevice, c, open } = useShowcase()
  const selected = media[device === 'desktop' ? 1 : 2]
  return (
    <section id="experience" className="experience-section">
      <div className="section-wrap section-pad">
        <div className="section-heading">
          <span className="eyebrow">{c.experienceEyebrow}</span>
          <h2>{c.experienceTitle}</h2>
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
                <span />
                <span />
                <span />
              </div>
              {selected.ready ? (
                <InlineVideo
                  key={device}
                  index={device === 'desktop' ? 1 : 2}
                  label={device === 'desktop' ? c.desktopTitle : c.mobileTitle}
                />
              ) : (
                <PuzzleArt />
              )}
            </Pressable>
          </div>
          <div className="experience-copy">
            <span className="micro-label">
              {device === 'desktop' ? 'DESKTOP' : 'MOBILE'}
            </span>
            <h3>{device === 'desktop' ? c.desktopTitle : c.mobileTitle}</h3>
            <Text>{device === 'desktop' ? c.desktopText : c.mobileText}</Text>
            <ul>
              {(device === 'desktop'
                ? c.desktopFeatures
                : c.mobileFeatures
              ).map((f) => (
                <li key={f}>
                  <span>
                    <Icon name="check" size={16} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Text className="fine-print">
              {device === 'desktop' ? c.desktopNote : c.mobileNote}
            </Text>
          </div>
        </div>
      </div>
    </section>
  )
}
