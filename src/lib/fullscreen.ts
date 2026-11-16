export type FullscreenVideo = {
  readyState?: number
  webkitSupportsFullscreen?: boolean
  requestFullscreen?: () => Promise<void>
  webkitEnterFullscreen?: () => void
}

/** Request directly from the gesture; WebKit video fullscreen requires metadata. */
export const requestMediaFullscreen = async (
  video: FullscreenVideo | null
): Promise<boolean> => {
  if (!video) {
    return false
  }
  // Prefer Safari's video-specific API while the original gesture is still active.
  if (
    video.webkitEnterFullscreen &&
    video.webkitSupportsFullscreen !== false &&
    (video.readyState === undefined || video.readyState >= 1)
  ) {
    try {
      video.webkitEnterFullscreen()
      return true
    } catch {
      // A synchronous refusal can still fall back to the standard API in this gesture.
    }
  }
  try {
    if (video.requestFullscreen) {
      await video.requestFullscreen()
      return true
    }
  } catch {
    // The viewport-filling dialog and its explicit play/fullscreen controls remain usable.
  }
  return false
}

export type FullscreenEventVideo = EventTarget & {
  webkitDisplayingFullscreen?: boolean
}
export type FullscreenEventDocument = EventTarget & {
  fullscreenElement: unknown
}

/** Native exit is terminal: return to the page instead of uncovering a second player. */
export const observeFullscreenExit = (
  video: FullscreenEventVideo,
  document: FullscreenEventDocument,
  onExit: () => void
) => {
  let entered = false
  const standardChange = () => {
    if (document.fullscreenElement === video) {
      entered = true
      return
    }
    if (entered) {
      entered = false
      onExit()
    }
  }
  const webkitBegin = () => {
    entered = true
  }
  const webkitEnd = () => {
    entered = false
    onExit()
  }
  document.addEventListener('fullscreenchange', standardChange)
  video.addEventListener('webkitbeginfullscreen', webkitBegin)
  video.addEventListener('webkitendfullscreen', webkitEnd)
  return () => {
    document.removeEventListener('fullscreenchange', standardChange)
    video.removeEventListener('webkitbeginfullscreen', webkitBegin)
    video.removeEventListener('webkitendfullscreen', webkitEnd)
  }
}
