import { describe, expect, it, vi } from 'vitest'
import {
  observePreviewResume,
  playSilentVideo,
  prepareSilentVideo
} from '../src/lib/playback'

const makeVideo = () => ({
  muted: false,
  defaultMuted: false,
  playsInline: false,
  setAttribute: vi.fn(),
  play: vi.fn<() => Promise<void> | void>().mockResolvedValue(undefined)
})

describe('Safari-compatible silent playback', () => {
  it('sets both DOM properties and inline attributes', () => {
    const video = makeVideo()
    prepareSilentVideo(video)
    expect(video.muted).toBe(true)
    expect(video.defaultMuted).toBe(true)
    expect(video.playsInline).toBe(true)
    expect(video.setAttribute).toHaveBeenCalledWith('muted', '')
    expect(video.setAttribute).toHaveBeenCalledWith('playsinline', '')
    expect(video.setAttribute).toHaveBeenCalledWith('webkit-playsinline', '')
  })
  it('calls play synchronously with the silent policy already applied', async () => {
    const video = makeVideo()
    video.play.mockImplementation(() => {
      expect(video.muted).toBe(true)
      expect(video.defaultMuted).toBe(true)
      return Promise.resolve()
    })
    const result = playSilentVideo(video)
    expect(video.play).toHaveBeenCalledOnce()
    expect(await result).toBe('playing')
  })
  it('reports blocked autoplay instead of silently claiming playback', async () => {
    const video = makeVideo()
    video.play.mockRejectedValue(
      new DOMException('Gesture required', 'NotAllowedError')
    )
    expect(await playSilentVideo(video)).toBe('blocked')
    video.play.mockRejectedValue({ name: 'NotAllowedError' })
    expect(await playSilentVideo(video)).toBe('blocked')
  })
  it('distinguishes expected pause/source interruptions from failures', async () => {
    const video = makeVideo()
    video.play.mockRejectedValue(new DOMException('Interrupted', 'AbortError'))
    expect(await playSilentVideo(video)).toBe('interrupted')
  })
  it('handles decode errors and legacy synchronous play()', async () => {
    const video = makeVideo()
    video.play.mockRejectedValue(new Error('Decode failed'))
    expect(await playSilentVideo(video)).toBe('error')
    video.play.mockReturnValue(undefined)
    expect(await playSilentVideo(video)).toBe('playing')
  })
})

describe('preview resumption', () => {
  it('resynchronizes a delayed native-exit pause and cleans up listeners', () => {
    const video = Object.assign(new EventTarget(), { controls: false })
    const page = new EventTarget()
    const sync = vi.fn()
    const cleanup = observePreviewResume(video, page, sync)
    page.dispatchEvent(new Event('jigsolver:resume-previews'))
    video.dispatchEvent(new Event('pause'))
    expect(sync).toHaveBeenCalledTimes(2)
    cleanup()
    video.dispatchEvent(new Event('pause'))
    page.dispatchEvent(new Event('jigsolver:resume-previews'))
    expect(sync).toHaveBeenCalledTimes(2)
  })
  it('does not fight the native player pause control', () => {
    const video = Object.assign(new EventTarget(), { controls: true })
    const sync = vi.fn()
    const cleanup = observePreviewResume(video, new EventTarget(), sync)
    video.dispatchEvent(new Event('pause'))
    expect(sync).not.toHaveBeenCalled()
    cleanup()
  })
})
