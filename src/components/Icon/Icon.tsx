export type IconName =
  | 'puzzle'
  | 'arrow'
  | 'play'
  | 'camera'
  | 'scan'
  | 'grid'
  | 'desktop'
  | 'phone'
  | 'sun'
  | 'moon'
  | 'close'
  | 'menu'
  | 'check'
  | 'expand'
export const Icon = ({
  name,
  size = 20
}: {
  name: IconName
  size?: number
}) => {
  const paths: Record<IconName, string> = {
    puzzle:
      'M4 4h5a3 3 0 1 1 6 0h5v5a3 3 0 1 1 0 6v5h-5a3 3 0 1 0-6 0H4v-5a3 3 0 1 0 0-6Z',
    arrow: 'M5 12h14m-5-5 5 5-5 5',
    play: 'm9 5 11 7-11 7Z',
    camera: 'M4 7h4l2-3h4l2 3h4v13H4ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    scan: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M7 12h10',
    grid: 'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',
    desktop: 'M3 4h18v13H3Zm9 13v4m-4 0h8',
    phone: 'M7 2h10v20H7Zm4 17h2',
    sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1',
    moon: 'M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z',
    close: 'm6 6 12 12M6 18 18 6',
    menu: 'M4 6h16M4 12h16M4 18h16',
    check: 'm5 12 4 4L19 6',
    expand: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5'
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}
