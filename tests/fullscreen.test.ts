import { describe, expect, it, vi } from 'vitest'
import {
  observeFullscreenExit,
  requestMediaFullscreen
} from '../src/lib/fullscreen'

describe('fullscreen fallback', () => {
  it('requests standard fullscreen on the media element', async () => {
    const requestFullscreen = vi.fn().mockResolvedValue(undefined)
    expect(await requestMediaFullscreen({ requestFullscreen })).toBe(true)
    expect(requestFullscreen).toHaveBeenCalledOnce()
  })
  it('supports the native WebKit video API when standard fullscreen is absent', async () => {
    const webkitEnterFullscreen = vi.fn()
    expect(await requestMediaFullscreen({ webkitEnterFullscreen })).toBe(true)
    expect(webkitEnterFullscreen).toHaveBeenCalledOnce()
  })
  it('keeps the dialog fallback when fullscreen is denied', async () => {
    expect(
      await requestMediaFullscreen({
        requestFullscreen: vi.fn().mockRejectedValue(new Error('Denied'))
      })
    ).toBe(false)
  })
  it('handles unsupported browsers and missing players', async () => {
    expect(await requestMediaFullscreen({})).toBe(false)
    expect(await requestMediaFullscreen(null)).toBe(false)
  })
})

describe('iPad fullscreen timing', () => {
  it('uses standard fullscreen while metadata is pending, never the WebKit video API', async () => {
    const requestFullscreen = vi.fn().mockResolvedValue(undefined)
    const webkitEnterFullscreen = vi.fn()
    expect(
      await requestMediaFullscreen({
        readyState: 0,
        requestFullscreen,
        webkitEnterFullscreen
      })
    ).toBe(true)
    expect(requestFullscreen).toHaveBeenCalledOnce()
    expect(webkitEnterFullscreen).not.toHaveBeenCalled()
  })
  it('prefers the ready Safari video API while the gesture is active', async () => {
    const requestFullscreen = vi.fn().mockResolvedValue(undefined)
    const webkitEnterFullscreen = vi.fn()
    const result = requestMediaFullscreen({
      readyState: 1,
      requestFullscreen,
      webkitEnterFullscreen
    })
    expect(webkitEnterFullscreen).toHaveBeenCalledOnce()
    expect(requestFullscreen).not.toHaveBeenCalled()
    expect(await result).toBe(true)
  })
  it('tries standard fullscreen after a synchronous WebKit refusal', async () => {
    const requestFullscreen = vi.fn().mockResolvedValue(undefined)
    const webkitEnterFullscreen = vi.fn(() => {
      throw new Error('Unsupported')
    })
    expect(
      await requestMediaFullscreen({
        readyState: 4,
        requestFullscreen,
        webkitEnterFullscreen
      })
    ).toBe(true)
    expect(requestFullscreen).toHaveBeenCalledOnce()
  })
  it('does not invoke a WebKit API that explicitly reports no support', async () => {
    const requestFullscreen = vi.fn().mockResolvedValue(undefined)
    const webkitEnterFullscreen = vi.fn()
    expect(
      await requestMediaFullscreen({
        readyState: 4,
        webkitSupportsFullscreen: false,
        requestFullscreen,
        webkitEnterFullscreen
      })
    ).toBe(true)
    expect(webkitEnterFullscreen).not.toHaveBeenCalled()
  })
})

describe('native fullscreen exit lifecycle', () => {
  it('returns directly to the page after standard fullscreen exits', () => {
    const video = new EventTarget()
    const doc = Object.assign(new EventTarget(), {
      fullscreenElement: null as unknown
    })
    const close = vi.fn()
    const cleanup = observeFullscreenExit(video, doc, close)
    doc.dispatchEvent(new Event('fullscreenchange'))
    expect(close).not.toHaveBeenCalled()
    doc.fullscreenElement = video
    doc.dispatchEvent(new Event('fullscreenchange'))
    doc.fullscreenElement = null
    doc.dispatchEvent(new Event('fullscreenchange'))
    expect(close).toHaveBeenCalledOnce()
    doc.dispatchEvent(new Event('fullscreenchange'))
    expect(close).toHaveBeenCalledOnce()
    cleanup()
    doc.dispatchEvent(new Event('fullscreenchange'))
    expect(close).toHaveBeenCalledOnce()
  })
  it('closes the session on Safari video fullscreen exit', () => {
    const video = new EventTarget()
    const doc = Object.assign(new EventTarget(), { fullscreenElement: null })
    const close = vi.fn()
    const cleanup = observeFullscreenExit(video, doc, close)
    video.dispatchEvent(new Event('webkitbeginfullscreen'))
    video.dispatchEvent(new Event('webkitendfullscreen'))
    expect(close).toHaveBeenCalledOnce()
    cleanup()
    video.dispatchEvent(new Event('webkitendfullscreen'))
    expect(close).toHaveBeenCalledOnce()
  })
})
