import { existsSync, readFileSync, statSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  adjacentReadyMedia,
  asset,
  demoMediaIndices,
  media,
  plannedDemoMediaIndices
} from '../src/data/media'

describe('publication assets', () => {
  it('provides a video, poster and all three caption languages for every published demo', () => {
    for (const item of media.filter((item) => item.ready)) {
      expect(item.ready).toBe(true)
      for (const path of [
        item.src,
        item.poster,
        `media/${item.id}.pt.vtt`,
        `media/${item.id}.en.vtt`,
        `media/${item.id}.fr.vtt`
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
      `${import.meta.env.BASE_URL}media/mobile.mp4?v=20261117-showcase-v9`
    )
    expect(asset('/media/mobile.webp')).toContain('mobile.webp?v=')
    expect(asset('media/mobile.pt.vtt')).toContain('.vtt?v=')
    expect(asset('favicon.svg')).toBe(`${import.meta.env.BASE_URL}favicon.svg`)
  })
})

it('ships the submitted Portuguese poster as a nonempty PDF', () => {
  const poster = readFileSync('public/documents/jigsolver-banner.pdf')
  expect(poster.subarray(0, 5).toString()).toBe('%PDF-')
  expect(poster.byteLength).toBeGreaterThan(1000)
  expect(asset('documents/jigsolver-banner.pdf')).toBe(
    `${import.meta.env.BASE_URL}documents/jigsolver-banner.pdf`
  )
})

it('assigns dedicated footage to each detailed demonstration', () => {
  expect(plannedDemoMediaIndices.map((index) => media[index].id)).toEqual([
    'pieces',
    'explore',
    'assistant',
    'photographed-assembly'
  ])
  expect(demoMediaIndices.every((index) => media[index].ready)).toBe(true)
  expect(media[6].portrait).toBe(true)
  expect(media[2].portrait).toBe(true)
})

it('skips footage still in preparation when navigating the player', () => {
  for (const index of media.keys()) {
    expect(media[adjacentReadyMedia(index, 1)].ready).toBe(true)
    expect(media[adjacentReadyMedia(index, -1)].ready).toBe(true)
  }
})
