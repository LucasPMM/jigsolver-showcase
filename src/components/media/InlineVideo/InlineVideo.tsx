import { useEffect, useRef, useState } from 'preact/hooks'
import { useShowcase } from '../../../contexts/ShowcaseContext'
import { asset, media } from '../../../data/media'
import {
  observePreviewResume,
  playSilentVideo,
  prepareSilentVideo
} from '../../../lib/playback'
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
    const lifecycle = {
      disposed: false,
      pending: false,
      attempt: 0,
      visible:
        rect.bottom > 0 &&
        rect.top < innerHeight &&
        rect.right > 0 &&
        rect.left < innerWidth
    }
    const sync = () => {
      if (nativeVideo.current === element) {
        return
      }
      const allowed =
        lifecycle.visible &&
        !document.hidden &&
        !motionPaused &&
        active === null
      if (!allowed) {
        lifecycle.attempt += 1
        lifecycle.pending = false
        element.pause()
        // Release offscreen decoders instead of preloading every repeated preview.
        if (element.hasAttribute('src')) {
          element.removeAttribute('src')
          element.load()
        }
        return
      }
      if (lifecycle.pending || !element.paused) {
        return
      }
      if (!element.hasAttribute('src')) {
        element.src = asset(item.src)
        element.load()
      }
      lifecycle.pending = true
      const attempt = ++lifecycle.attempt
      void playSilentVideo(element).then((result) => {
        if (attempt !== lifecycle.attempt) {
          return
        }
        lifecycle.pending = false
        if (!lifecycle.disposed && result !== 'interrupted') {
          setBlocked(result === 'blocked')
          setFailed(result === 'error')
        }
      })
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        lifecycle.visible = entry.isIntersecting
        sync()
      },
      { threshold: 0.15 }
    )
    observer.observe(element)
    sync()
    const stopResume = observePreviewResume(element, window, sync)
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('pageshow', sync)
    element.addEventListener('loadedmetadata', sync)
    element.addEventListener('canplay', sync)
    return () => {
      lifecycle.disposed = true
      observer.disconnect()
      stopResume()
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('pageshow', sync)
      element.removeEventListener('loadedmetadata', sync)
      element.removeEventListener('canplay', sync)
      if (nativeVideo.current !== element) {
        element.pause()
      }
    }
  }, [motionPaused, active, nativeVideo, item.src])
  return (
    <>
      <Video
        ref={video}
        className="inline-video"
        data-media-index={index}
        // Visibility owns resource selection and playback; autoplay would race it.
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
        onError={() => setFailed(true)}
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
