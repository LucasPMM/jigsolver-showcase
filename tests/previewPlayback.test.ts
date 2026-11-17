import { describe, expect, it, vi } from 'vitest'
import type { PlaybackResult } from '../src/lib/playback'
import { createPreviewPlayback } from '../src/lib/previewPlayback'

const setup = () => {
  const state = { src: '', assignments: 0 }
  const video = {
    get src() {
      return state.src
    },
    set src(value: string) {
      state.src = value
      state.assignments += 1
    },
    paused: true,
    autoplay: false,
    preload: 'none',
    pause: vi.fn(),
    getAttribute: () => state.src || null
  }
  const play = vi
    .fn<() => Promise<PlaybackResult>>()
    .mockResolvedValue('playing')
  const report = vi.fn()
  return {
    video,
    state,
    play,
    report,
    controller: createPreviewPlayback(video, '/clip.mp4', { play, report })
  }
}

describe('stable preview resource lifecycle', () => {
  it('does not imperatively assign an offscreen source', () => {
    const { controller, video, state, play } = setup()
    controller.sync(false)
    expect(state.assignments).toBe(0)
    expect(play).not.toHaveBeenCalled()
    expect(video.autoplay).toBe(false)
  })
  it('selects a source once and enables native autoplay before play', async () => {
    const { controller, video, state, play } = setup()
    play.mockImplementation(() => {
      expect(video.autoplay).toBe(true)
      expect(video.src).toBe('/clip.mp4')
      return Promise.resolve('playing')
    })
    controller.sync(true)
    await Promise.resolve()
    controller.sync(false)
    controller.sync(true)
    expect(state.assignments).toBe(1)
    expect(play).toHaveBeenCalledTimes(2)
  })
  it('preserves an already declared resource across visibility changes', async () => {
    const { controller, video, state } = setup()
    video.src = '/clip.mp4'
    controller.sync(true)
    await Promise.resolve()
    controller.sync(false)
    controller.sync(true)
    expect(state.assignments).toBe(1)
    expect(video.preload).toBe('metadata')
  })
  it('does not restart a pending request on duplicate visibility events', () => {
    const { controller, play } = setup()
    controller.sync(true)
    controller.sync(true)
    expect(play).toHaveBeenCalledOnce()
  })
  it('ignores stale results after scrolling away', async () => {
    const { controller, report } = setup()
    controller.sync(true)
    controller.sync(false)
    await Promise.resolve()
    expect(report).not.toHaveBeenCalled()
  })
  it('does not report intentional interruptions as media errors', async () => {
    const { controller, play, report } = setup()
    play.mockResolvedValue('interrupted')
    controller.sync(true)
    await Promise.resolve()
    expect(report).not.toHaveBeenCalled()
  })
  it('retains the native player on effect cleanup and ignores stale callbacks', async () => {
    const { controller, video, report } = setup()
    controller.sync(true)
    controller.dispose(false)
    await Promise.resolve()
    expect(video.pause).not.toHaveBeenCalled()
    expect(report).not.toHaveBeenCalled()
  })
})
