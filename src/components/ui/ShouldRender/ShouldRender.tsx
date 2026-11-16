import type { ComponentChildren } from 'preact'
import type { PropsWithChildren } from 'preact/compat'
export type ShouldRenderProps = PropsWithChildren<{
  if: boolean
  fallback?: ComponentChildren
}>
export const ShouldRender = ({
  if: condition,
  children,
  fallback = null
}: ShouldRenderProps) => (condition ? children : fallback)
