import type { PressableProps } from '../Pressable'
import { Pressable } from '../Pressable'
import { ShouldRender } from '../ShouldRender'
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonProps = PressableProps & {
  variant?: ButtonVariant
  loading?: boolean
  loadingLabel?: string
}
/** Adapted from JigSolver's variant/loading contract without its React locale provider. */
export const Button = ({
  variant = 'primary',
  loading = false,
  loadingLabel = 'Please wait…',
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) => (
  <Pressable
    {...props}
    className={`button ${variant} ${className}`.trim()}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
  >
    <ShouldRender if={loading} fallback={children}>
      {loadingLabel}
    </ShouldRender>
  </Pressable>
)
