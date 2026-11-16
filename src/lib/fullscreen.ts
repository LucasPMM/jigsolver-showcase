export type FullscreenVideo = {
  requestFullscreen?: () => Promise<void>
  webkitEnterFullscreen?: () => void
}

/** Call from a user gesture. The caller keeps its accessible dialog as fallback. */
export const requestMediaFullscreen = async (
  video: FullscreenVideo | null
): Promise<boolean> => {
  if (!video) {
    return false
  }
  try {
    if (video.requestFullscreen) {
      await video.requestFullscreen()
      return true
    }
    if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen()
      return true
    }
  } catch {
    // Unsupported devices or a denied request keep the dialog player available.
  }
  return false
}
