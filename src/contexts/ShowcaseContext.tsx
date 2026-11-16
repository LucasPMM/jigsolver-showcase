import { createContext } from 'preact'
import { flushSync, type PropsWithChildren } from 'preact/compat'
import { useContext, useEffect, useRef, useState } from 'preact/hooks'
import {
  observeFullscreenExit,
  requestMediaFullscreen
} from '../lib/fullscreen'
import { playSilentVideo } from '../lib/playback'
import { resolveTheme } from '../lib/preferences'
import type { pt } from '../locales/content'
import i18n, {
  initialLanguage,
  type Language,
  readPreference,
  savePreference
} from '../locales/i18n'

const useShowcaseState = () => {
  const [lang, setLang] = useState<Language>(initialLanguage)
  const [theme, setTheme] = useState(
    resolveTheme(readPreference('jigsolver-theme'))
  )
  const [motionPaused, setMotionPaused] = useState(
    () => matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setMotionPaused(query.matches)
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])
  const [menu, setMenu] = useState(false)
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [active, setActive] = useState<number | null>(null)
  const [fallbackOpen, setFallbackOpen] = useState(false)
  const nativeVideo = useRef<HTMLVideoElement | null>(null)
  const nativeCleanup = useRef<(() => void) | null>(null)
  const nativeAttempt = useRef(0)
  const [error, setError] = useState(false)
  const [mediaIndex, setMediaIndex] = useState(0)
  const [hasMetadata, setHasMetadata] = useState(false)
  const [playback, setPlayback] = useState<
    'idle' | 'loading' | 'playing' | 'paused' | 'blocked' | 'error'
  >('idle')
  const playbackAttempt = useRef(0)
  const [credits, setCredits] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const c = i18n.getResourceBundle(lang, 'translation') as typeof pt
  const anchors = ['journey', 'experience', 'demos', 'photographed']
  useEffect(() => {
    document.documentElement.lang = lang
    void i18n.changeLanguage(lang)
    savePreference('jigsolver-language', lang)
    document.title = `JigSolver — ${c.hero} ${c.heroEm}`
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', document.title)
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', c.intro)
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', c.intro)
  }, [lang, c])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    savePreference('jigsolver-theme', theme)
  }, [theme])
  useEffect(() => {
    document.body.style.overflow = fallbackOpen ? 'hidden' : ''
    if (!fallbackOpen) {
      dialog.current?.close()
    }
    if (fallbackOpen && !dialog.current?.open) {
      dialog.current?.showModal()
    }
    if (active === null) {
      opener.current?.focus({ preventScroll: true })
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [fallbackOpen, active])
  const playCurrent = () => {
    const element = video.current
    if (!element) {
      return
    }
    const attempt = ++playbackAttempt.current
    if (element.error || element.networkState === 3) {
      element.load()
    }
    setError(false)
    setPlayback('loading')
    // Call play() before awaiting anything: Safari may require this exact click.
    void playSilentVideo(element).then((result) => {
      if (attempt !== playbackAttempt.current || result === 'interrupted') {
        return
      }
      setPlayback(result)
      if (result === 'error') {
        setError(true)
      }
    })
  }
  const open = (index: number, rememberFocus = true) => {
    const sourceChanged = index !== mediaIndex
    // Native controls can bubble clicks through the original preview wrapper.
    if (nativeVideo.current && !fallbackOpen) {
      return
    }
    if (rememberFocus) {
      opener.current = document.activeElement as HTMLElement
    }
    const candidates = Array.from(
      document.querySelectorAll<HTMLVideoElement>(
        `video.inline-video[data-media-index="${index}"]`
      )
    )
    const ready = candidates.filter((element) => element.readyState >= 1)
    const target =
      ready.find((element) => {
        const rect = element.getBoundingClientRect()
        return rect.bottom > 0 && rect.top < innerHeight
      }) ??
      ready[0] ??
      candidates[0]
    const attempt = ++nativeAttempt.current
    nativeCleanup.current?.()
    nativeCleanup.current = null
    nativeVideo.current = target ?? null
    flushSync(() => {
      setActive(index)
      setMediaIndex(index)
      setError(false)
      setPlayback('loading')
    })
    const showFallback = () => {
      if (attempt !== nativeAttempt.current) {
        return
      }
      nativeCleanup.current?.()
      nativeCleanup.current = null
      nativeVideo.current = null
      target?.pause()
      flushSync(() => setFallbackOpen(true))
      if (!dialog.current?.open) {
        dialog.current?.showModal()
      }
      const element = video.current
      if (element && (sourceChanged || element.networkState === 0)) {
        element.load()
      }
      setHasMetadata(Boolean(element && element.readyState >= 1))
      playCurrent()
    }
    const nativeTarget = target as
      | (HTMLVideoElement & {
          webkitEnterFullscreen?: () => void
          webkitSupportsFullscreen?: boolean
        })
      | undefined
    const nativeAvailable =
      nativeTarget &&
      (typeof nativeTarget.requestFullscreen === 'function' ||
        (typeof nativeTarget.webkitEnterFullscreen === 'function' &&
          nativeTarget.webkitSupportsFullscreen !== false &&
          nativeTarget.readyState >= 1))
    if (!target || !nativeAvailable) {
      showFallback()
      return
    }
    const previousControls = target.controls
    target.controls = true
    const stopWatching = observeFullscreenExit(target, document, () => close())
    nativeCleanup.current = () => {
      stopWatching()
      target.controls = previousControls
    }
    // Use the already-mounted preview; no modal is shown on the native path.
    void playSilentVideo(target)
    void requestMediaFullscreen(target).then((entered) => {
      if (attempt !== nativeAttempt.current) {
        if (document.fullscreenElement === target) {
          void document.exitFullscreen().catch(() => {})
        }
        return
      }
      if (entered) {
        setFallbackOpen(false)
        return
      }
      showFallback()
    })
  }
  const expand = () => open(mediaIndex, false)
  const restart = () => {
    const element = video.current
    if (!element) {
      return
    }
    // Retry resource selection after a load/decode failure, never on every playback attempt.
    if (element.error || element.networkState === 3) {
      element.load()
    }
    if (element.readyState >= 1) {
      element.currentTime = 0
    }
    playCurrent()
  }
  const toggleMotion = () => {
    const paused = !motionPaused
    flushSync(() => setMotionPaused(paused))
    if (!paused && active === null) {
      for (const element of document.querySelectorAll<HTMLVideoElement>(
        'video.inline-video'
      )) {
        const rect = element.getBoundingClientRect()
        if (
          rect.bottom > 0 &&
          rect.top < innerHeight &&
          rect.right > 0 &&
          rect.left < innerWidth
        ) {
          void playSilentVideo(element)
        }
      }
    }
  }
  const close = () => {
    playbackAttempt.current += 1
    nativeAttempt.current += 1
    const target = nativeVideo.current as
      | (HTMLVideoElement & {
          webkitDisplayingFullscreen?: boolean
          webkitExitFullscreen?: () => void
        })
      | null
    nativeCleanup.current?.()
    nativeCleanup.current = null
    nativeVideo.current = null
    target?.pause()
    video.current?.pause()
    if (target && document.fullscreenElement === target) {
      void document.exitFullscreen().catch(() => {})
    }
    if (target?.webkitDisplayingFullscreen) {
      target.webkitExitFullscreen?.()
    }
    setFallbackOpen(false)
    setActive(null)
    setPlayback('idle')
  }
  const language = (value: Language) => {
    setLang(value)
    const url = new URL(location.href)
    url.searchParams.set('lang', value === 'en' ? 'en' : 'pt')
    history.replaceState(null, '', url)
  }

  return {
    motionPaused,
    toggleMotion,
    nativeVideo,
    fallbackOpen,
    mediaIndex,
    hasMetadata,
    setHasMetadata,
    playback,
    setPlayback,
    playCurrent,
    expand,
    restart,
    lang,
    theme,
    setTheme,
    menu,
    setMenu,
    device,
    setDevice,
    active,
    setActive,
    error,
    setError,
    credits,
    setCredits,
    dialog,
    video,
    c,
    anchors,
    open,
    close,
    language
  }
}
const ShowcaseContext = createContext<ReturnType<
  typeof useShowcaseState
> | null>(null)
export const ShowcaseProvider = ({ children }: PropsWithChildren) => {
  const value = useShowcaseState()
  return (
    <ShowcaseContext.Provider value={value}>
      {children}
    </ShowcaseContext.Provider>
  )
}
export const useShowcase = () => {
  const value = useContext(ShowcaseContext)
  if (!value) {
    throw new Error('ShowcaseProvider is required')
  }
  return value
}
