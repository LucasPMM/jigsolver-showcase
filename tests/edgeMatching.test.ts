import { describe, expect, it } from 'vitest'
import { edgeMatchingPairs, solvedEdgeGrid } from '../src/data/edgeMatching'

describe('edge matching illustration', () => {
  it('matches all four internal contacts without using a neutral border label', () => {
    const [topLeft, topRight, bottomLeft, bottomRight] = solvedEdgeGrid
    const outgoing = [topLeft[1], topLeft[2], topRight[2], bottomLeft[1]]
    const incoming = [
      topRight[3],
      bottomLeft[0],
      bottomRight[0],
      bottomRight[3]
    ]
    expect(outgoing).toEqual(incoming)
    expect(outgoing).not.toContain(0)
    expect(new Set(outgoing).size).toBe(4)
  })

  it('contrasts a matching pair with the same tile rotated to expose a mismatch', () => {
    const [first, second] = edgeMatchingPairs.valid
    const [sameFirst, rotated] = edgeMatchingPairs.invalid
    expect(first).toBe(sameFirst)
    expect(first[1]).toBe(second[3])
    expect(first[1]).not.toBe(rotated[3])
    expect(rotated).toEqual([second[3], second[0], second[1], second[2]])
  })
})
