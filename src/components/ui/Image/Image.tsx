import type { JSX } from 'preact'
import { flushSync } from 'preact/compat'
import { useEffect, useId, useRef, useState } from 'preact/hooks'
import { observeFullscreenExit } from '../../../lib/fullscreen'
import { Icon } from '../Icon'
import { Pressable } from '../Pressable'
import { ShouldRender } from '../ShouldRender'
import { Text } from '../Text'

export type ImageProps = Omit<
  JSX.ImgHTMLAttributes<HTMLImageElement>,
  'children' | 'alt' | 'src' | 'ref'
> & {
  src: string
  alt: string
  fullscreen?: boolean
  fullscreenSrc?: string
  fullscreenAlt?: string
  fullscreenLabel?: string
  closeLabel?: string
  unavailableLabel?: string
  triggerClassName?: string
}

/** Optional accessible image viewer; noninteractive images remain ordinary images. */
export const Image = ({
  src,
  alt,
  fullscreen = false,
  fullscreenSrc = src,
  fullscreenAlt = alt,
  fullscreenLabel = 'View image fullscreen',
  closeLabel = 'Close image',
  unavailableLabel = 'The image could not be loaded.',
  triggerClassName = '',
  ...props
}: ImageProps) => {
  const dialog = useRef<HTMLDialogElement>(null)
  const surface = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const stopWatching = useRef<(() => void) | null>(null)
  const requestId = useRef(0)
  const [opened, setOpened] = useState(false)
  const [failed, setFailed] = useState(false)
  const titleId = useId()
  const close = () => {
    requestId.current += 1
    stopWatching.current?.()
    stopWatching.current = null
    if (document.fullscreenElement === surface.current) {
      void document.exitFullscreen().catch(() => {})
    }
    dialog.current?.close()
    setOpened(false)
    opener.current?.focus({ preventScroll: true })
  }
  useEffect(() => () => stopWatching.current?.(), [])
  useEffect(() => {
    if (!opened) {
      return
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [opened])
  const open = () => {
    opener.current = document.activeElement as HTMLElement
    flushSync(() => {
      setOpened(true)
      setFailed(false)
    })
    dialog.current?.showModal()
    const target = surface.current
    if (!target) {
      return
    }
    const attempt = ++requestId.current
    stopWatching.current?.()
    stopWatching.current = observeFullscreenExit(target, document, close)
    // The same viewer is the fallback; a native exit closes the viewer completely.
    try {
      void target
        .requestFullscreen?.()
        .then(() => {
          if (
            attempt !== requestId.current &&
            document.fullscreenElement === target
          ) {
            void document.exitFullscreen().catch(() => {})
          }
        })
        .catch(() => {})
    } catch {
      /* Native fullscreen is optional. */
    }
  }
  const image = <img {...props} src={src} alt={alt} />
  if (!fullscreen) {
    return image
  }
  return (
    <>
      <Pressable
        className={`image-trigger ${triggerClassName}`.trim()}
        onClick={open}
        aria-label={fullscreenLabel}
        aria-haspopup="dialog"
      >
        {image}
      </Pressable>
      <dialog
        ref={dialog}
        className="image-viewer"
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault()
          close()
        }}
      >
        <div ref={surface} className="image-viewer-surface">
          <div className="image-viewer-header">
            <Text as="h2" id={titleId}>
              {fullscreenAlt}
            </Text>
            <Pressable
              className="icon-button"
              onClick={close}
              aria-label={closeLabel}
            >
              <Icon name="close" />
            </Pressable>
          </div>
          <img
            src={opened ? fullscreenSrc : undefined}
            alt={fullscreenAlt}
            onError={() => setFailed(true)}
          />
          <ShouldRender if={failed}>
            <Text role="alert">{unavailableLabel}</Text>
          </ShouldRender>
        </div>
      </dialog>
    </>
  )
}
