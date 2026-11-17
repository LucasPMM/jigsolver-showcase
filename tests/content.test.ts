import { describe, expect, it } from 'vitest'
import { demoMediaIndices, media } from '../src/data/media'
import { en, fr, pt } from '../src/locales/content'

const shape = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(shape)
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, shape(v)])
    )
  }
  return typeof value
}
describe('translations', () => {
  it('has complete matching Portuguese, English and French structures', () => {
    expect(shape(en)).toEqual(shape(pt))
    expect(shape(fr)).toEqual(shape(en))
  })
  it('matches the media catalogue and contains three journey steps', () => {
    expect(pt.demos).toHaveLength(demoMediaIndices.length)
    expect(en.demos).toHaveLength(demoMediaIndices.length)
    expect(en.featuredVideos.length + en.demos.length).toBe(media.length)
    expect(en.steps).toHaveLength(3)
  })
  it('makes the research limits explicit', () => {
    expect(pt.photosNote).toContain('Não há gabarito independente')
    expect(en.photosNote).toContain('no independent ground truth')
  })
})
