import { useShowcase } from '../../context/ShowcaseContext'
import { asset, media } from '../../media'
import { Icon } from '../Icon'
import { PuzzleArt } from '../PuzzleArt'

export const MediaDialog = () => {
  const { lang, active, setActive, error, setError, dialog, video, c, close } =
    useShowcase()

  return (
    <dialog
      ref={dialog}
      className="media-dialog"
      aria-labelledby="demo-dialog-title"
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          close()
        }
      }}
      onClick={(e) => {
        if (e.target === dialog.current) {
          close()
        }
      }}
    >
      <div className="dialog-content">
        {active !== null && (
          <>
            <div className="dialog-header">
              <div>
                <span className="micro-label">{c.demos[active].category}</span>
                <h3 id="demo-dialog-title">{c.demos[active].title}</h3>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={close}
                aria-label={c.close}
              >
                <Icon name="close" />
              </button>
            </div>
            {media[active].ready ? (
              <>
                <video
                  key={media[active].id}
                  ref={video}
                  autoPlay
                  controls
                  playsInline
                  preload="metadata"
                  poster={asset(media[active].poster)}
                  onError={() => setError(true)}
                >
                  <source src={asset(media[active].src)} type="video/mp4" />
                  <track
                    kind="captions"
                    src={asset(
                      `media/${media[active].id}.${lang === 'en' ? 'en' : 'pt'}.vtt`
                    )}
                    srcLang={lang}
                    label={lang === 'en' ? 'English' : 'Português'}
                    default
                  />
                </video>
                {error && <p role="alert">{c.mediaUnavailable}</p>}
              </>
            ) : (
              <div className="pending">
                <PuzzleArt />
                <p>{c.pendingMedia}</p>
              </div>
            )}
            <p className="dialog-caption">{c.demos[active].desc}</p>
            <div className="dialog-controls">
              <button
                type="button"
                className="button secondary"
                onClick={() => setActive((active + 2) % 3)}
                aria-label={c.previous}
              >
                ←
              </button>
              <button
                type="button"
                className="button secondary"
                disabled={!media[active].ready}
                onClick={() => {
                  if (video.current) {
                    video.current.currentTime = 0
                    void video.current.play().catch(() => {})
                  }
                }}
              >
                {c.replay}
              </button>
              <button
                type="button"
                className="button secondary"
                onClick={() => setActive((active + 1) % 3)}
                aria-label={c.next}
              >
                →
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  )
}
