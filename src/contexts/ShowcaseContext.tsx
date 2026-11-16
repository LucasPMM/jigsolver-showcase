import { type ComponentChildren, createContext } from 'preact'
import { flushSync } from 'preact/compat'
import { useContext, useEffect, useRef, useState } from 'preact/hooks'
import { requestMediaFullscreen } from '../lib/fullscreen'
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
  const [error, setError] = useState(false)
  const [credits, setCredits] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const c = i18n.getResourceBundle(lang, 'translation') as typeof pt
  const anchors = ['journey', 'experience', 'demos', 'research']
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
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      document.documentElement.dataset.theme =
        theme === 'system' ? (mq.matches ? 'dark' : 'light') : theme
    }
    apply()
    savePreference('jigsolver-theme', theme)
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])
  useEffect(() => {
    if (active !== null) {
      dialog.current?.showModal()
      document.body.style.overflow = 'hidden'
      setError(false)
    } else {
      dialog.current?.close()
      document.body.style.overflow = ''
      opener.current?.focus()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])
  const open = (index: number) => {
    opener.current = document.activeElement as HTMLElement
    // Flush the player into the DOM while the click still grants user activation.
    flushSync(() => setActive(index))
    if (dialog.current && !dialog.current.open) {
      dialog.current.showModal()
    }
    void video.current?.play().catch(() => {})
    void requestMediaFullscreen(video.current)
  }
  const close = () => {
    video.current?.pause()
    if (document.fullscreenElement === video.current) {
      void document.exitFullscreen().catch(() => {})
    }
    setActive(null)
  }
  const language = (value: Language) => {
    setLang(value)
    const url = new URL(location.href)
    url.searchParams.set('lang', value === 'en' ? 'en' : 'pt')
    history.replaceState(null, '', url)
  }

  return {
    motionPaused,
    setMotionPaused,
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
export const ShowcaseProvider = ({
  children
}: {
  children: ComponentChildren
}) => {
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
