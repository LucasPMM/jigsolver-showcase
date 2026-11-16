import { Text } from '../../ui/Text'
export const PuzzleArt = ({ stage = 2 }: { stage?: number }) => {
  return (
    <div className={`puzzle-art stage-${stage}`} aria-hidden="true">
      <div className="art-orbit" />
      <div className="piece-grid">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={`art-piece piece-${i}`}>
            <Text as="span" />
          </div>
        ))}
      </div>
      <Text as="span" className="scan-line" />
      <Text as="span" className="art-cross cross-a">
        +
      </Text>
      <Text as="span" className="art-cross cross-b">
        +
      </Text>
    </div>
  )
}
