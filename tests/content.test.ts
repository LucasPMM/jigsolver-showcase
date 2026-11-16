import { describe, expect, it } from 'vitest'
import { en, pt } from '../src/locales/content'

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
  it('has complete matching Portuguese and English structures', () => {
    expect(shape(en)).toEqual(shape(pt))
  })
  it('contains three demonstrations and three journey steps', () => {
    expect(pt.demos).toHaveLength(3)
    expect(en.steps).toHaveLength(3)
  })
  it('makes the research limits explicit', () => {
    expect(pt.evidenceNote).toContain('não uma garantia')
    expect(en.evidenceNote).toContain('not a guarantee')
  })
})
