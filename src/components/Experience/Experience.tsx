import { useShowcase } from '../../context/ShowcaseContext'
import { media } from '../../media'
import { Icon } from '../Icon'
import { InlineVideo } from '../InlineVideo'
import { PuzzleArt } from '../PuzzleArt'

export const Experience = () => {
  const { device, setDevice, c, open } = useShowcase()
  const selected = media[device === 'desktop' ? 1 : 2]
  return (
    <section id="experience" className="experience-section">
      <div className="section-wrap section-pad">
        <div className="section-heading">
          <span className="eyebrow">{c.experienceEyebrow}</span>
          <h2>{c.experienceTitle}</h2>
          <p>{c.experienceIntro}</p>
        </div>
        <fieldset className="device-tabs" aria-label={c.experienceTitle}>
          <button
            type="button"
            aria-pressed={device === 'desktop'}
            onClick={() => setDevice('desktop')}
          >
            <Icon name="desktop" />
            {c.desktop}
          </button>
          <button
            type="button"
            aria-pressed={device === 'mobile'}
            onClick={() => setDevice('mobile')}
          >
            <Icon name="phone" />
            {c.mobile}
          </button>
        </fieldset>
        <div className={`experience-panel ${device}`}>
          <div className="experience-media">
            <button
              type="button"
              className="device-frame"
              onClick={() => open(device === 'desktop' ? 1 : 2)}
              aria-label={c.play}
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
              <span className="floating-play">
                <Icon name="play" size={24} />
              </span>
            </button>
          </div>
          <div className="experience-copy">
            <span className="micro-label">
              {device === 'desktop' ? 'DESKTOP' : 'MOBILE'}
            </span>
            <h3>{device === 'desktop' ? c.desktopTitle : c.mobileTitle}</h3>
            <p>{device === 'desktop' ? c.desktopText : c.mobileText}</p>
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
            <p className="fine-print">
              {device === 'desktop' ? c.desktopNote : c.mobileNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
