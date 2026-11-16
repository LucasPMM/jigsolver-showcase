import type { IconProps } from '../types'
export const PhoneIcon = ({ className, size = 20 }: IconProps) => (
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
    <path d="M7 2h10v20H7Zm4 17h2" />
  </svg>
)
