import { useShowcase } from '../../../contexts/ShowcaseContext'
import { Text } from '../../ui/Text'

const pieces = [
  {
    id: 'A',
    scores: [0.95, 0.9],
    outline: 'M3 3H41V15C58 10 58 34 41 29V41H3Z'
  },
  { id: 'B', scores: [0.94, 0.3], outline: 'M3 3H41V41H3V29C20 34 20 10 3 15Z' }
] as const
const choices = [
  [0, 1],
  [1, 0]
] as const

export const HungarianExample = () => {
  const { c, lang } = useShowcase()
  const guide = c.methodGuide
  const format = new Intl.NumberFormat(lang, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  return (
    <div className="method-assignment">
      <table>
        <thead>
          <tr>
            <th scope="col">{guide.piece}</th>
            <th scope="col">{guide.left}</th>
            <th scope="col">{guide.right}</th>
          </tr>
        </thead>
        <tbody>
          {pieces.map(({ id, scores }, i) => (
            <tr key={id}>
              <th scope="row">{id}</th>
              {scores.map((score, j) => (
                <td
                  key={score}
                  className={i + j === 1 ? 'method-score-chosen' : undefined}
                >
                  {format.format(score)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="method-choices">
        {choices.map(([left, right], i) => (
          <div
            className={
              i === 1 ? 'method-choice method-choice-best' : 'method-choice'
            }
            key={left}
          >
            <Text as="strong">{i === 1 ? guide.global : guide.local}</Text>
            <div className="method-slots">
              <svg viewBox="0 0 82 44" aria-hidden="true" focusable="false">
                {[left, right].map((piece, column) => (
                  <path
                    key={piece}
                    d={pieces[piece].outline}
                    fill={piece === 0 ? '#ecc187' : '#a7cddd'}
                    stroke="#3e5050"
                    transform={`translate(${column * 38} 0)${
                      i === 1 ? ' rotate(180 22 22)' : ''
                    }`}
                  />
                ))}
              </svg>
              <Text as="span">{pieces[left].id}</Text>
              <Text as="span">{pieces[right].id}</Text>
            </div>
            <Text as="span" className="method-sum">
              {format.format(pieces[left].scores[0])} +{' '}
              {format.format(pieces[right].scores[1])} ={' '}
              {format.format(pieces[left].scores[0] + pieces[right].scores[1])}
            </Text>
          </div>
        ))}
      </div>
    </div>
  )
}
