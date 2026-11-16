import type { JSX } from 'preact'
import type { PropsWithChildren } from 'preact/compat'

export type ActionPressableProps = PropsWithChildren<
  Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled'> & {
    href?: never
    disabled?: boolean
  }
>
export type LinkPressableProps = PropsWithChildren<
  Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> & {
    href: string
    disabled?: boolean
  }
>
export type PressableProps = ActionPressableProps | LinkPressableProps

/** A destination remains a real anchor; an action remains a native button. */
export const Pressable = (props: PressableProps) => {
  if (props.href !== undefined) {
    const { disabled, href, onClick, tabIndex, target, rel, ...rest } =
      props as LinkPressableProps
    return (
      <a
        {...rest}
        href={disabled ? undefined : href}
        target={target}
        rel={
          target === '_blank' ? `${rel ?? ''} noopener noreferrer`.trim() : rel
        }
        role={disabled ? 'link' : rest.role}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault()
            return
          }
          onClick?.(event)
        }}
      />
    )
  }
  const { type = 'button', ...rest } = props as ActionPressableProps
  return <button type={type} {...rest} />
}
