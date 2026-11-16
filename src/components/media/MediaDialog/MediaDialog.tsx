import { useShowcase } from '../../../contexts/ShowcaseContext'
import { asset, media } from '../../../data/media'
import { PuzzleArt } from '../../illustrations/PuzzleArt'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Pressable } from '../../ui/Pressable'
import { ShouldRender } from '../../ui/ShouldRender'
import { Text } from '../../ui/Text'

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
              <Pressable
                type="button"
                className="icon-button"
                onClick={close}
                aria-label={c.close}
              >
                <Icon name="close" />
              </Pressable>
            </div>
            {media[active].ready ? (
              <>
                <video
                  key={media[active].id}
                  ref={video}
                  autoPlay
                  loop
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
                <ShouldRender if={error}>
                  <Text role="alert">{c.mediaUnavailable}</Text>
                </ShouldRender>
              </>
            ) : (
              <div className="pending">
                <PuzzleArt />
                <Text>{c.pendingMedia}</Text>
              </div>
            )}
            <Text className="dialog-caption">{c.demos[active].desc}</Text>
            <div className="dialog-controls">
              <Button
                variant="secondary"
                onClick={() => setActive((active + 2) % 3)}
                aria-label={c.previous}
              >
                ←
              </Button>
              <Button
                variant="secondary"
                disabled={!media[active].ready}
                onClick={() => {
                  if (video.current) {
                    video.current.currentTime = 0
                    void video.current.play().catch(() => {})
                  }
                }}
              >
                {c.replay}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setActive((active + 1) % 3)}
                aria-label={c.next}
              >
                →
              </Button>
            </div>
          </>
        )}
      </div>
    </dialog>
  )
}
