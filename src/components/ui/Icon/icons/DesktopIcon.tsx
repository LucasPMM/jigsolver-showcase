import type { IconProps } from '../types'
export const DesktopIcon = ({ className, size = 20 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M3 4h18v13H3Zm9 13v4m-4 0h8" />
  </svg>
)
