import { useEffect, useRef, useState } from 'preact/hooks'
import { useShowcase } from '../../../contexts/ShowcaseContext'
import { asset, media } from '../../../data/media'
import {
  observePreviewResume,
  playSilentVideo,
  prepareSilentVideo
} from '../../../lib/playback'
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
  const { motionPaused, active, nativeVideo, c } = useShowcase()
  const video = useRef<HTMLVideoElement>(null)
  const [blocked, setBlocked] = useState(false)
  const [failed, setFailed] = useState(false)
  const item = media[index]
  const source = asset(item.src)
  useEffect(() => {
    const element = video.current
    if (!element) {
      return
    }
    prepareSilentVideo(element)
    const rect = element.getBoundingClientRect()
    const playback = createPreviewPlayback(element, source, {
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
    const stopResume = observePreviewResume(element, window, () => {
      // Native fullscreen can leave the observer with its transitional geometry.
      const current = element.getBoundingClientRect()
      lifecycle.visible =
        current.bottom > 0 &&
        current.top < innerHeight &&
        current.right > 0 &&
        current.left < innerWidth
      sync()
    })
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('pageshow', sync)
      stopResume()
      playback.dispose(nativeVideo.current !== element)
    }
  }, [motionPaused, active, nativeVideo, source])
  return (
    <>
      <Video
        ref={video}
        className="inline-video"
        data-media-index={index}
        // Select the resource declaratively, like the native player verified on iPad.
        src={source}
        autoPlay={!motionPaused && active === null}
        muted
        loop
        playsInline
        preload="metadata"
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
      />
      <ShouldRender if={(blocked || failed) && !motionPaused}>
        <Text as="span" className="inline-video-hint">
          {failed ? c.mediaUnavailable : c.tapToPlay}
        </Text>
      </ShouldRender>
    </>
  )
}
