type EdgeTile = readonly [number, number, number, number]

// Edge labels in clockwise order: top, right, bottom, left.
export const solvedEdgeGrid = [
  [0, 1, 2, 0],
  [0, 0, 3, 1],
  [2, 4, 0, 0],
  [3, 0, 0, 4]
] as const satisfies ReadonlyArray<EdgeTile>

export const rotateEdgeTile = ([
  top,
  right,
  bottom,
  left
]: EdgeTile): EdgeTile => [left, top, right, bottom]

export const edgeMatchingPairs = {
  valid: [solvedEdgeGrid[0], solvedEdgeGrid[1]],
  invalid: [solvedEdgeGrid[0], rotateEdgeTile(solvedEdgeGrid[1])]
} as const
