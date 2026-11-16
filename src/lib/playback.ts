export type PlaybackResult = 'playing' | 'blocked' | 'interrupted' | 'error'
export type SilentVideo = {
  muted: boolean
  defaultMuted: boolean
  playsInline: boolean
  setAttribute: (name: string, value: string) => void
  play: () => Promise<void> | void
}

/** Set properties as well as attributes before playback, including Safari's legacy hint. */
export const prepareSilentVideo = (video: SilentVideo) => {
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', '')
}

/** Invoke directly from the click handler when autoplay requires user activation. */
export const playSilentVideo = async (
  video: SilentVideo
): Promise<PlaybackResult> => {
  prepareSilentVideo(video)
  try {
    await video.play()
    return 'playing'
  } catch (error) {
    const name =
      typeof error === 'object' && error !== null && 'name' in error
        ? String(error.name)
        : ''
    if (name === 'AbortError') {
      return 'interrupted'
    }
    return name === 'NotAllowedError' ? 'blocked' : 'error'
  }
}
