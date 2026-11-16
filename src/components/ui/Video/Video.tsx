import type { JSX } from 'preact'
import { forwardRef, type PropsWithChildren } from 'preact/compat'
import { useCallback } from 'preact/hooks'
import { prepareSilentVideo } from '../../../lib/playback'

export type VideoProps = PropsWithChildren<
  Omit<JSX.VideoHTMLAttributes<HTMLVideoElement>, 'children' | 'ref'>
>
/** Reusable media element. Playback orchestration belongs to its caller. */
export const Video = forwardRef<HTMLVideoElement, VideoProps>(
  (
    {
      children,
      muted = true,
      playsInline = true,
      preload = 'metadata',
      ...props
    },
    ref
  ) => {
    const attach = useCallback(
      (element: HTMLVideoElement | null) => {
        if (element) {
          if (muted) {
            prepareSilentVideo(element)
          }
          if (!muted) {
            element.muted = false
            element.defaultMuted = false
          }
          element.playsInline = Boolean(playsInline)
          if (playsInline) {
            element.setAttribute('webkit-playsinline', '')
          }
          if (!playsInline) {
            element.removeAttribute('webkit-playsinline')
          }
        }
        if (typeof ref === 'function') {
          ref(element)
          return
        }
        if (ref) {
          ref.current = element
        }
      },
      [ref, muted, playsInline]
    )
    return (
      <video
        {...props}
        ref={attach}
        muted={muted}
        playsInline={playsInline}
        preload={preload}
      >
        {children}
      </video>
    )
  }
)
