import { useId } from 'preact/hooks'
import { Text } from '../../ui/Text'

const tab = 'M3 3H41V15C58 10 58 34 41 29V41H3Z'
const recess = 'M3 3H41V41H3V29C20 34 20 10 3 15Z'

export const RefinementArt = ({
  labels
}: {
  labels: readonly [string, string]
}) => {
  const id = useId()
  return (
    <div className="refinement-art">
      {labels.map((label, i) => (
        <figure key={label}>
          <svg viewBox="0 0 108 59" aria-hidden="true" focusable="false">
            <defs>
              <clipPath id={`${id}-a-${i}`}>
                <path d={tab} />
              </clipPath>
              <clipPath id={`${id}-b-${i}`}>
                <path d={recess} />
              </clipPath>
            </defs>
            <g transform="translate(8 8)">
              <path d={tab} fill="#e8b677" stroke="#4a6259" />
              <path
                d="M6 18H62"
                clip-path={`url(#${id}-a-${i})`}
                stroke="#356e81"
                stroke-width="3"
              />
            </g>
            <g
              transform={
                i === 0
                  ? 'translate(62 8) rotate(180 22 22)'
                  : 'translate(46 8)'
              }
            >
              <path d={recess} fill="#e8b677" stroke="#4a6259" />
              <path
                d="M0 18H38"
                clip-path={`url(#${id}-b-${i})`}
                stroke="#356e81"
                stroke-width="3"
              />
            </g>
            {i === 0 ? (
              <path
                d="M60 23l7 7m0-7-7 7"
                stroke="var(--method-alert)"
                stroke-width="2"
                fill="none"
              />
            ) : (
              <path
                d="m86 46 5 5 8-9"
                stroke="var(--method-success)"
                stroke-width="2"
                fill="none"
              />
            )}
          </svg>
          <Text as="figcaption">{label}</Text>
        </figure>
      ))}
    </div>
  )
}
