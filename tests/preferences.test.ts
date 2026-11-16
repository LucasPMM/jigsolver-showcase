import { describe, expect, it } from 'vitest'
import { resolveLanguage, resolveTheme } from '../src/lib/preferences'

describe('preferences', () => {
  it('prefers explicit URL language', () => {
    expect(resolveLanguage('en', 'pt-BR', 'pt-BR')).toBe('en')
  })
  it('uses saved selection before browser', () => {
    expect(resolveLanguage(null, 'pt-BR', 'en-US')).toBe('pt-BR')
  })
  it('recognizes English and falls back to Portuguese', () => {
    expect(resolveLanguage(null, null, 'en-US')).toBe('en')
    expect(resolveLanguage(null, null, 'fr')).toBe('pt-BR')
  })
  it('rejects invalid themes', () => {
    expect(resolveTheme('unknown')).toBe('system')
    expect(resolveTheme('dark')).toBe('dark')
  })
})
