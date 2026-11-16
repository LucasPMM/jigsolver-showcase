import type { ComponentChildren } from 'preact'

export type ShouldRenderProps = {
  if: boolean
  children: ComponentChildren
}

const ShouldRender = ({ if: condition, children }: ShouldRenderProps) => {
  if (!condition) {
    return null
  }
  return <>{children}</>
}

export { ShouldRender }
