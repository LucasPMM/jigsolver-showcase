import { useEffect, useRef } from 'preact/hooks'
import { useShowcase } from '../../context/ShowcaseContext'
import { asset, media } from '../../media'
export const InlineVideo = ({
  index,
  label
}: {
  index: number
  label: string
}) => {
  const { motionPaused, active } = useShowcase()
  const video = useRef<HTMLVideoElement>(null)
  const item = media[index]
  useEffect(() => {
    const element = video.current
    if (!element) {
      return
    }
    let visible = false
    const sync = () => {
      if (visible && !document.hidden && !motionPaused && active === null) {
        void element.play().catch(() => {
          /* Browsers may refuse autoplay; the poster and modal remain available. */
        })
      } else {
        element.pause()
      }
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
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      element.pause()
    }
  }, [motionPaused, active])
  return (
    <video
      ref={video}
      className="inline-video"
      muted
      loop
      playsInline
      preload="metadata"
      poster={asset(item.poster)}
      aria-label={label}
      disablePictureInPicture
    >
      <source src={asset(item.src)} type="video/mp4" />
    </video>
  )
}
