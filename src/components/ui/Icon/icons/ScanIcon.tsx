import type { IconProps } from '../types'
export const ScanIcon = ({ className, size = 20 }: IconProps) => (
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
    <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M7 12h10" />
  </svg>
)
