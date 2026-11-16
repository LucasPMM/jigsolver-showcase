import { existsSync, readFileSync, statSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { asset, media } from '../src/data/media'

describe('publication assets', () => {
  it('provides a video, poster and both caption languages for every published demo', () => {
    for (const item of media) {
      expect(item.ready).toBe(true)
      for (const path of [
        item.src,
        item.poster,
        `media/${item.id}.pt.vtt`,
        `media/${item.id}.en.vtt`
      ]) {
        expect(existsSync(`public/${path}`), path).toBe(true)
        expect(statSync(`public/${path}`).size, path).toBeGreaterThan(0)
      }
      expect(readFileSync(`public/media/${item.id}.pt.vtt`, 'utf8')).toMatch(
        /^WEBVTT/
      )
    }
  })
})

describe('media cache revision', () => {
  it('revisions video, poster, and caption URLs while preserving base paths', () => {
    expect(asset('media/mobile.mp4')).toBe(
      `${import.meta.env.BASE_URL}media/mobile.mp4?v=20261116-showcase-v5`
    )
    expect(asset('/media/mobile.webp')).toContain('mobile.webp?v=')
    expect(asset('media/mobile.pt.vtt')).toContain('.vtt?v=')
    expect(asset('favicon.svg')).toBe(`${import.meta.env.BASE_URL}favicon.svg`)
  })
})
