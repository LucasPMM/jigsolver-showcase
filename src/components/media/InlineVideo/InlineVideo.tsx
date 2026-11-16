import { useEffect, useRef, useState } from 'preact/hooks'
import { useShowcase } from '../../../contexts/ShowcaseContext'
import { asset, media } from '../../../data/media'
import { playSilentVideo, prepareSilentVideo } from '../../../lib/playback'
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
  const item = media[index]
  useEffect(() => {
    const element = video.current
    if (!element) {
      return
    }
    prepareSilentVideo(element)
    let disposed = false
    let visible = false
    let pending = false
    const sync = () => {
      if (nativeVideo.current === element) {
        return
      }
      const allowed =
        visible && !document.hidden && !motionPaused && active === null
      if (!allowed) {
        element.pause()
        return
      }
      if (pending || !element.paused) {
        return
      }
      pending = true
      void playSilentVideo(element).then((result) => {
        pending = false
        if (!disposed && result !== 'interrupted') {
          setBlocked(result !== 'playing')
        }
      })
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        sync()
      },
      { threshold: 0.15 }
    )
    observer.observe(element)
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('pageshow', sync)
    element.addEventListener('loadedmetadata', sync)
    element.addEventListener('canplay', sync)
    return () => {
      disposed = true
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('pageshow', sync)
      element.removeEventListener('loadedmetadata', sync)
      element.removeEventListener('canplay', sync)
      if (nativeVideo.current !== element) {
        element.pause()
      }
    }
  }, [motionPaused, active, nativeVideo])
  return (
    <>
      <Video
        ref={video}
        className="inline-video"
        data-media-index={index}
        src={asset(item.src)}
        autoPlay={
          !motionPaused &&
          (active === null || nativeVideo.current === video.current)
        }
        muted
        loop
        playsInline
        preload="metadata"
        poster={asset(item.poster)}
        aria-label={label}
        disablePictureInPicture
        onPlaying={() => setBlocked(false)}
      >
        <track
          key={`${item.id}-${lang}`}
          kind="captions"
          src={asset(`media/${item.id}.${lang === 'en' ? 'en' : 'pt'}.vtt`)}
          srcLang={lang}
          label={lang === 'en' ? 'English' : 'Português'}
        />
      </Video>
      <ShouldRender if={blocked && !motionPaused}>
        <Text as="span" className="inline-video-hint">
          {c.tapToPlay}
        </Text>
      </ShouldRender>
    </>
  )
}
