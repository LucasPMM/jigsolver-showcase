import { describe, expect, it } from 'vitest'
import { resolveLanguage, resolveTheme } from '../src/lib/preferences'

describe('persistent explicit preferences', () => {
  it('defaults to English, independent of the browser language', () => {
    expect(resolveLanguage(null, null)).toBe('en')
    expect(resolveLanguage('unknown', null)).toBe('en')
  })
  it('keeps saved Portuguese unless a valid URL override is provided', () => {
    expect(resolveLanguage(null, 'pt-BR')).toBe('pt-BR')
    expect(resolveLanguage('en', 'pt-BR')).toBe('en')
    expect(resolveLanguage('pt', 'en')).toBe('pt-BR')
    expect(resolveLanguage('invalid', 'pt-BR')).toBe('pt-BR')
  })
  it('defaults to light and migrates the removed system option to light', () => {
    expect(resolveTheme(null)).toBe('light')
    expect(resolveTheme('system')).toBe('light')
    expect(resolveTheme('unknown')).toBe('light')
  })
  it('retains either saved explicit theme', () => {
    expect(resolveTheme('dark')).toBe('dark')
    expect(resolveTheme('light')).toBe('light')
  })
})
