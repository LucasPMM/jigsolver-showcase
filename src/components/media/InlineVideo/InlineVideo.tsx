import { useEffect, useRef, useState } from 'preact/hooks'
import { useShowcase } from '../../../contexts/ShowcaseContext'
import { asset, media } from '../../../data/media'
import { playSilentVideo, prepareSilentVideo } from '../../../lib/playback'
import { createPreviewPlayback } from '../../../lib/previewPlayback'
import { ShouldRender } from '../../ui/ShouldRender'
import { Text } from '../../ui/Text'
import { Video } from '../../ui/Video'

export const InlineVideo = ({
  index,
  label
}: {
  index: number
  label: string
}) => {
  const { motionPaused, active, nativeVideo, lang, c } = useShowcase()
  const video = useRef<HTMLVideoElement>(null)
  const [blocked, setBlocked] = useState(false)
  const [failed, setFailed] = useState(false)
  const item = media[index]
  useEffect(() => {
    const element = video.current
    if (!element) {
      return
    }
    prepareSilentVideo(element)
    const rect = element.getBoundingClientRect()
    const playback = createPreviewPlayback(element, asset(item.src), {
      play: playSilentVideo,
      report: (result) => {
        setBlocked(result === 'blocked')
        setFailed(result === 'error')
      }
    })
    const lifecycle = {
      visible:
        rect.bottom > 0 &&
        rect.top < innerHeight &&
        rect.right > 0 &&
        rect.left < innerWidth
    }
    const sync = () => {
      // The expanded player owns this same element until native fullscreen exits.
      if (nativeVideo.current === element) {
        return
      }
      playback.sync(
        lifecycle.visible &&
          !document.hidden &&
          !motionPaused &&
          active === null
      )
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        lifecycle.visible =
          entry.isIntersecting && entry.intersectionRatio >= 0.15
        sync()
      },
      { threshold: [0, 0.15] }
    )
    observer.observe(element)
    sync()
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('pageshow', sync)
    window.addEventListener('jigsolver:resume-previews', sync)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('pageshow', sync)
      window.removeEventListener('jigsolver:resume-previews', sync)
      playback.dispose(nativeVideo.current !== element)
    }
  }, [motionPaused, active, nativeVideo, item.src])
  return (
    <>
      <Video
        ref={video}
        className="inline-video"
        data-media-index={index}
        // The controller owns autoplay and a stable, lazily selected source.
        autoPlay={false}
        muted
        loop
        playsInline
        preload="none"
        poster={asset(item.poster)}
        aria-label={label}
        disablePictureInPicture
        onPlaying={() => {
          setBlocked(false)
          setFailed(false)
        }}
        onError={(event) => {
          // Empty-resource transitions are not evidence of a failed MP4.
          if (event.currentTarget.error && event.currentTarget.currentSrc) {
            setFailed(true)
          }
        }}
      >
        <track
          key={`${item.id}-${lang}`}
          kind="captions"
          src={asset(`media/${item.id}.${lang === 'en' ? 'en' : 'pt'}.vtt`)}
          srcLang={lang}
          label={lang === 'en' ? 'English' : 'Português'}
        />
      </Video>
      <ShouldRender if={(blocked || failed) && !motionPaused}>
        <Text as="span" className="inline-video-hint">
          {failed ? c.mediaUnavailable : c.tapToPlay}
        </Text>
      </ShouldRender>
    </>
  )
}
