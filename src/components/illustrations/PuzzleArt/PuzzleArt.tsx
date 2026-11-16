export const PuzzleArt = ({ stage = 2 }: { stage?: number }) => {
  return (
    <div className={`puzzle-art stage-${stage}`} aria-hidden="true">
      <div className="art-orbit" />
      <div className="piece-grid">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={`art-piece piece-${i}`}>
            <span />
          </div>
        ))}
      </div>
      <span className="scan-line" />
      <span className="art-cross cross-a">+</span>
      <span className="art-cross cross-b">+</span>
    </div>
  )
}
