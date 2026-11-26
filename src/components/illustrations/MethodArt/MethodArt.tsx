import type { ComponentChildren } from 'preact'
import { useId } from 'preact/hooks'
import { edgeMatchingPairs, solvedEdgeGrid } from '../../../data/edgeMatching'

type ArtKind =
  | 'otsu'
  | 'mobileSam'
  | 'rgba'
  | 'registration'
  | 'contrast'
  | 'edges'
  | 'packing'
  | 'capture'
  | 'assignment'
  | 'assembly'
const pieceOutline = 'M0 0H48V13C67 6 67 36 48 29V42H0Z'
const points = [
  [8, 11],
  [30, 11],
  [19, 24],
  [33, 33]
] as const
const marks = ['#f5c56b', '#b0e3bc', '#fbbc94', '#cbb9ef']
const edgeColors = ['#e1dfd5', '#a3d7b7', '#b1d3e3', '#d8bee2', '#f3cd8d']
const facets = [
  '0,0 32,0 16,16',
  '32,0 32,32 16,16',
  '32,32 0,32 16,16',
  '0,32 0,0 16,16'
]
const edgeMark = [
  '',
  'M-2.4-2.4h4.8v4.8h-4.8Z',
  'M0-2.9 2.9 2.4h-5.8Z',
  'M0-3.2 2.8 0 0 3.2-2.8 0Z',
  'M-2.5 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0'
]
const edgeMarkPositions = [
  [16, 5],
  [27, 16],
  [16, 27],
  [5, 16]
]
const loose = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [1, 1]
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2]
  ],
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1]
  ]
]
const polyColors = ['#a3d7b7', '#f3cd8d', '#b1d3e3']
const packed = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [1, 1]
  ],
  [
    [2, 2],
    [3, 2],
    [4, 2],
    [2, 3]
  ],
  [
    [3, 0],
    [4, 0],
    [3, 1],
    [4, 1]
  ]
]
const bins = [4, 11, 32, 23, 6, 2, 0, 3, 12, 25, 33, 13, 4]

const Arrow = ({ x, y = 51 }: { x: number; y?: number }) => (
  <path d={`M${x} ${y}h23m-6-6 6 6-6 6`} className="method-art-arrow" />
)

const EdgeTile = ({
  x,
  y,
  edges
}: {
  x: number
  y: number
  edges: ReadonlyArray<number>
}) => (
  <g transform={`translate(${x} ${y})`} data-edges={edges.join(',')}>
    {edges.map((edge, i) => (
      <polygon
        key={facets[i]}
        points={facets[i]}
        fill={edgeColors[edge]}
        stroke="#fbfaf6"
        stroke-width="0.5"
      />
    ))}
    {edges.map((edge, i) => (
      <path
        key={facets[i]}
        d={edgeMark[edge]}
        transform={`translate(${edgeMarkPositions[i].join(' ')})`}
        fill="#3c4e45"
      />
    ))}
    <rect
      width="32"
      height="32"
      fill="none"
      stroke="#5e655e"
      stroke-width="0.7"
    />
  </g>
)

const EdgeArt = () => (
  <>
    <g data-edge-example="valid">
      <EdgeTile x={16} y={33} edges={edgeMatchingPairs.valid[0]} />
      <EdgeTile x={48} y={33} edges={edgeMatchingPairs.valid[1]} />
      <path d="M45 49h6" stroke="#3c4e45" stroke-width="1.2" />
    </g>
    <g data-edge-example="invalid">
      <EdgeTile x={109} y={33} edges={edgeMatchingPairs.invalid[0]} />
      <EdgeTile x={141} y={33} edges={edgeMatchingPairs.invalid[1]} />
      <path d="M141 43v12" stroke="var(--method-alert)" stroke-width="2" />
    </g>
    <path
      d="m40 78 5 5 9-10"
      fill="none"
      stroke="var(--method-success)"
      stroke-width="3"
    />
    <path
      d="m136 72 10 10m0-10-10 10"
      fill="none"
      stroke="var(--method-alert)"
      stroke-width="3"
    />
    <g data-edge-example="solved">
      {solvedEdgeGrid.map((edges, i) => (
        <EdgeTile
          key={edges.join()}
          x={208 + (i % 2) * 32}
          y={19 + Math.floor(i / 2) * 32}
          edges={edges}
        />
      ))}
      <path
        d="M237 35h6M224 48v6M256 48v6M237 67h6"
        stroke="#3c4e45"
        stroke-width="1.2"
        stroke-linecap="round"
      />
    </g>
  </>
)

const PolyArt = () => (
  <>
    {loose.map((cells, i) =>
      cells.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={9 + x * 11 + i * 38}
          y={35 + y * 11}
          width="11"
          height="11"
          rx="1"
          fill={polyColors[i]}
          stroke="#58675c"
          stroke-width=".75"
        />
      ))
    )}
    <Arrow x={123} />
    {Array.from({ length: 20 }, (_, i) => (
      <rect
        key={i}
        x={178 + (i % 5) * 19}
        y={14 + Math.floor(i / 5) * 19}
        width="19"
        height="19"
        fill="var(--surface)"
        stroke="var(--line)"
      />
    ))}
    {packed.map((cells, i) =>
      cells.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={178 + x * 19}
          y={14 + y * 19}
          width="19"
          height="19"
          rx="1"
          fill={polyColors[i]}
          stroke="#58675c"
          stroke-width=".75"
        />
      ))
    )}
  </>
)

export const MethodArt = ({ kind }: { kind: ArtKind }) => {
  const id = useId()
  const ref = `#${id}-reference`
  const slice = `url(#${id}-slice)`
  const muted = `url(#${id}-gray)`
  const cropped = (
    <g clip-path={slice}>
      <use href={ref} x="-48" y="-42" />
    </g>
  )
  const outline = (
    <path
      d={pieceOutline}
      fill="none"
      stroke="var(--method-outline)"
      stroke-width="1.6"
    />
  )
  const align = (
    <>
      <g transform="translate(24 30)">
        {cropped}
        {outline}
      </g>
      <Arrow x={104} />
      <g transform="translate(145 8) scale(.82)">
        <use href={ref} />
        <path
          d="M48 0v126M96 0v126M0 42h144M0 84h144"
          stroke="#fff6de"
          stroke-width="1.5"
          opacity=".9"
        />
        <g transform="translate(48 42)">
          {cropped}
          {outline}
        </g>
      </g>
    </>
  )
  const registration = (
    <>
      <g transform="translate(20 32)">
        {cropped}
        {outline}
      </g>
      <g transform="translate(148 8) scale(.83)">
        <use href={ref} />
      </g>
      {points.map(([x, y], i) => {
        const key = `${x}-${y}`
        const a = [20 + x, 32 + y]
        const b = [148 + (48 + x) * 0.83, 8 + (42 + y) * 0.83]
        return (
          <g key={key} stroke={marks[i]} stroke-width="1.5" fill={marks[i]}>
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
            <circle cx={a[0]} cy={a[1]} r="2.6" />
            <circle cx={b[0]} cy={b[1]} r="2.6" />
          </g>
        )
      })}
    </>
  )
  const contrastArt = (
    <>
      <g transform="translate(15 30)" filter={`url(#${id}-dim)`}>
        {cropped}
      </g>
      <path
        d="m22 85 9 9m0-9-9 9"
        fill="none"
        stroke="var(--method-alert)"
        stroke-width="2"
      />
      <Arrow x={88} />
      <g transform="translate(121 30)" filter={muted}>
        {cropped}
        {outline}
      </g>
      {points.map(([x, y], i) => (
        <circle
          key={marks[i]}
          cx={121 + x}
          cy={30 + y}
          r="3"
          fill={marks[i]}
          stroke="#414b40"
        />
      ))}
      <Arrow x={193} />
      <g transform="translate(224 30)">
        {cropped}
        {outline}
      </g>
      <path
        d="m240 88 5 5 9-10"
        fill="none"
        stroke="var(--method-success)"
        stroke-width="2.5"
      />
    </>
  )
  const segment = (ai: boolean) => (
    <>
      <g transform="translate(12 18)">
        <rect width="76" height="66" rx="5" fill="#414b40" />
        <g
          transform="translate(13 16) scale(.77)"
          filter={ai ? undefined : muted}
        >
          {cropped}
        </g>
        {ai && (
          <rect
            x="8"
            y="10"
            width="58"
            height="46"
            fill="none"
            stroke="#a6f1c1"
            stroke-width="1.6"
          />
        )}
      </g>
      <Arrow x={95} />
      {ai ? (
        <g transform="translate(127 18)">
          <rect width="67" height="66" rx="5" fill="#282f28" />
          <path
            d={pieceOutline}
            transform="translate(10 17) scale(.8)"
            fill="#a6f1c1"
          />
        </g>
      ) : (
        <g transform="translate(130 22)">
          <path d="M0 0v54h66" className="method-art-arrow" />
          {bins.map((h, i) => (
            <rect
              key={`${i}-${h}`}
              x={4 + i * 4.5}
              y={54 - h}
              width="3.6"
              height={h}
              fill="var(--muted)"
            />
          ))}
          <path
            d="M31 6v48"
            stroke="var(--method-alert)"
            stroke-width="1.5"
            stroke-dasharray="3 2"
          />
        </g>
      )}
      <Arrow x={204} />
      <g transform="translate(237 31) scale(.85)">
        {ai ? cropped : <path d={pieceOutline} fill="currentColor" />}
        {outline}
      </g>
    </>
  )
  const capture = (
    <>
      <g transform="translate(26 9)">
        <rect width="120" height="94" rx="9" fill="#414b40" />
        <g transform="translate(35 26)">{cropped}</g>
        <path
          d="M13 31V14h17m60 0h17v17m0 32v17H90m-60 0H13V63"
          fill="none"
          stroke="#d0efd8"
          stroke-width="2"
        />
      </g>
      <g transform="translate(171 10) scale(.73)">
        <use href={ref} />
      </g>
    </>
  )
  const assignment = (
    <>
      <g transform="translate(27 30)">
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            x={(i % 3) * 19}
            y={Math.floor(i / 3) * 17}
            width="17"
            height="15"
            fill={i % 4 === 0 ? '#a3d7b7' : 'var(--surface)'}
            stroke="var(--line)"
            rx="2"
          />
        ))}
      </g>
      <Arrow x={106} />
      <g transform="translate(158 14) scale(.67)">
        <use href={ref} opacity=".43" />
        <path
          d="M48 0v126M96 0v126M0 42h144M0 84h144"
          stroke="#fff6de"
          stroke-width="2"
        />
        <g transform="translate(48 42)">
          {cropped}
          {outline}
        </g>
      </g>
    </>
  )
  const assembly = (
    <g transform="translate(89 7) scale(.78)">
      <use href={ref} />
      <g fill="none" stroke="#53493d" stroke-width="1.5" opacity=".75">
        <path d="M48 0v126M96 0v42m0 42v42M0 42h144M0 84h144" />
        <path transform="translate(48 42)" d={pieceOutline} />
      </g>
    </g>
  )
  const artwork: Record<ArtKind, ComponentChildren> = {
    rgba: align,
    registration: registration,
    contrast: contrastArt,
    otsu: segment(false),
    mobileSam: segment(true),
    edges: <EdgeArt />,
    packing: <PolyArt />,
    capture,
    assignment,
    assembly
  }
  return (
    <svg
      viewBox="0 0 290 114"
      className="method-art-svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <g id={`${id}-reference`}>
          <rect width="144" height="126" rx="4" fill="#e8b677" />
          <path
            d="M0 24h144M0 53h144M0 81h144"
            stroke="#cf975e"
            stroke-width="2"
          />
          <path d="M0 100h144v22q0 4-4 4H4q-4 0-4-4Z" fill="#9b7660" />
          <rect x="55" y="49" width="33" height="30" rx="1" fill="#415b68" />
          <rect x="58" y="52" width="27" height="24" fill="#92b7c7" />
          <path d="M71.5 51v26M57 63.5h29" stroke="#415b68" stroke-width="2" />
          <circle cx="79" cy="57" r="3" fill="#f4d198" />
          <path d="m111 24 9-10 10 10m-15-3v13h10V21" fill="#b68154" />
        </g>
        <clipPath id={`${id}-slice`}>
          <path d={pieceOutline} />
        </clipPath>
        <filter id={`${id}-gray`}>
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id={`${id}-dim`}>
          <feColorMatrix
            type="matrix"
            values=".064 .215 .021 0 .32 .064 .215 .021 0 .32 .064 .215 .021 0 .32 0 0 0 1 0"
          />
        </filter>
      </defs>
      {artwork[kind]}
    </svg>
  )
}
