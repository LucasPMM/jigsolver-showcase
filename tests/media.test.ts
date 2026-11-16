import { existsSync, readFileSync, statSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { media } from '../src/media'

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
