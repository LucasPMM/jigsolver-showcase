import { Text } from '../../ui/Text'

// The same schematic profile defines the edge of the mask and the sampled points.
const samples = [
  [8, 0],
  [29, 0],
  [43, 0],
  [48, 0.35],
  [53, 0.85],
  [58, 1],
  [63, 0.85],
  [68, 0.35],
  [73, 0],
  [87, 0],
  [108, 0]
] as const
const cases = [0, -18, 18] as const
const baseline = 37

export const SideProfileArt = ({
  labels
}: {
  labels: readonly [string, string, string]
}) => (
  <div className="side-profile-art">
    {cases.map((delta, index) => {
      const profile = samples.map(([x, depth]) => [x, baseline + depth * delta])
      return (
        <figure className="side-profile-example" key={delta}>
          <svg viewBox="0 0 116 81" aria-hidden="true" focusable="false">
            <path
              className="side-profile-mask"
              d={`M${profile.map((point) => point.join(' ')).join(' L')}V74H8Z`}
            />
            <rect
              className="side-profile-band"
              x="43"
              y="5"
              width="30"
              height="69"
              rx="2"
            />
            {profile.slice(2, 9).map(([x, y]) => (
              <path
                className="side-profile-sample"
                key={x}
                d={`M${x} 7V${y}`}
              />
            ))}
            <path className="side-profile-base" d="M8 37H108" />
            <path className="side-profile-shoulders" d="M18 37H35M81 37H98" />
            {profile.slice(2, 9).map(([x, y]) => (
              <circle
                key={x}
                className="side-profile-point"
                cx={x}
                cy={y}
                r="2"
              />
            ))}
          </svg>
          <Text as="figcaption">{labels[index]}</Text>
        </figure>
      )
    })}
  </div>
)
