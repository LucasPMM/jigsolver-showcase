import { describe, expect, it } from 'vitest'
import { resolveLanguage } from '../src/lib/preferences'
import { deploymentVersion } from '../src/lib/version'

describe('deployment version', () => {
  it('increments the patch with each workflow run and stays stable on retries', () => {
    expect(deploymentVersion('0.1.0', '12')).toBe('0.1.12')
    expect(deploymentVersion('0.1.0', '13')).toBe('0.1.13')
    expect(deploymentVersion('0.1.0', '12')).toBe('0.1.12')
  })
  it('labels local and invalid run numbers as development builds', () => {
    expect(deploymentVersion('0.1.0')).toBe('0.1.0-dev')
    expect(deploymentVersion('0.1.0', 'invalid')).toBe('0.1.0-dev')
  })
})

describe('French preference', () => {
  it('accepts French links and saved preferences', () => {
    expect(resolveLanguage('fr', null)).toBe('fr')
    expect(resolveLanguage(null, 'fr')).toBe('fr')
    expect(resolveLanguage('fr-FR', 'en')).toBe('fr')
  })
})
