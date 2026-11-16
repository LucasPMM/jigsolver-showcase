import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { panelCrop, photographed } from '../src/data/photographed'

describe('photographed evidence', () => {
  it('keeps both original photographs and historical output panels available', () => {
    expect(photographed).toHaveLength(2)
    for (const example of photographed) {
      expect(existsSync(`public/${example.src}`)).toBe(true)
      expect(existsSync(`public/${example.original}`)).toBe(true)
    }
  })
  it('keeps every display crop inside the unchanged source panel', () => {
    for (const left of panelCrop.left) {
      expect(left).toBeGreaterThanOrEqual(0)
      expect(left + panelCrop.cropWidth).toBeLessThanOrEqual(panelCrop.width)
    }
    expect(panelCrop.top + panelCrop.cropHeight).toBeLessThanOrEqual(
      panelCrop.height
    )
  })
})
