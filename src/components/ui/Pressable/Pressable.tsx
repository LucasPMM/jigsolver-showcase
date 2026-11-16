import type { JSX } from 'preact'
export type PressableProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>
/** Native button semantics provide keyboard activation and disabled behavior. */
export const Pressable = ({ type = 'button', ...props }: PressableProps) => (
  <button type={type} {...props} />
)
