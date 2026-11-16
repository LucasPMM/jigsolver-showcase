import { describe, expect, it, vi } from 'vitest'
import { requestMediaFullscreen } from '../src/lib/fullscreen'

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
