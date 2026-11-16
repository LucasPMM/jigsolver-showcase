import type { ComponentType } from 'preact'
import { ArrowIcon } from './icons/ArrowIcon'
import { CameraIcon } from './icons/CameraIcon'
import { CheckIcon } from './icons/CheckIcon'
import { DesktopIcon } from './icons/DesktopIcon'
import { ExpandIcon } from './icons/ExpandIcon'
import { GridIcon } from './icons/GridIcon'
import { MenuIcon } from './icons/MenuIcon'
import { MoonIcon } from './icons/MoonIcon'
import { PhoneIcon } from './icons/PhoneIcon'
import { PieceIcon } from './icons/PieceIcon'
import { ScanIcon } from './icons/ScanIcon'
import { SunIcon } from './icons/SunIcon'
import { XIcon } from './icons/XIcon'
import type { IconProps } from './types'
export type IconName =
  | 'puzzle'
  | 'camera'
  | 'sun'
  | 'moon'
  | 'check'
  | 'menu'
  | 'close'
  | 'arrow'
  | 'scan'
  | 'grid'
  | 'desktop'
  | 'phone'
  | 'expand'
const ICONS: Record<IconName, ComponentType<IconProps>> = {
  puzzle: PieceIcon,
  camera: CameraIcon,
  sun: SunIcon,
  moon: MoonIcon,
  check: CheckIcon,
  menu: MenuIcon,
  close: XIcon,
  arrow: ArrowIcon,
  scan: ScanIcon,
  grid: GridIcon,
  desktop: DesktopIcon,
  phone: PhoneIcon,
  expand: ExpandIcon
}
export const Icon = ({ name, ...props }: IconProps & { name: IconName }) => {
  const Component = ICONS[name]
  return <Component {...props} />
}
