import type { PlaybackResult } from './playback'

type PreviewVideo = {
  src: string
  paused: boolean
  autoplay: boolean
  preload: string
  pause: () => void
  getAttribute: (name: string) => string | null
}

type PlaybackDriver<T> = {
  play: (element: T) => Promise<PlaybackResult>
  report: (result: PlaybackResult) => void
}

/** Keep one source selection per preview; scrolling must not reset WebKit's media pipeline. */
export const createPreviewPlayback = <T extends PreviewVideo>(
  element: T,
  source: string,
  driver: PlaybackDriver<T>
) => {
  const state = { disposed: false, pending: false, attempt: 0 }
  const sync = (allowed: boolean) => {
    if (state.disposed) {
      return
    }
    element.autoplay = allowed
    element.preload = allowed ? 'metadata' : 'none'
    if (!allowed) {
      state.attempt += 1
      state.pending = false
      element.pause()
      return
    }
    if (state.pending || !element.paused) {
      return
    }
    // Assigning src already starts resource selection. Calling load() again aborts it.
    if (element.getAttribute('src') !== source) {
      element.src = source
    }
    state.pending = true
    const attempt = ++state.attempt
    void driver.play(element).then((result) => {
      if (state.disposed || attempt !== state.attempt) {
        return
      }
      state.pending = false
      if (result !== 'interrupted') {
        driver.report(result)
      }
    })
  }
  const dispose = (pause = true) => {
    state.disposed = true
    state.attempt += 1
    if (pause) {
      element.autoplay = false
      element.pause()
    }
  }
  return { sync, dispose }
}
