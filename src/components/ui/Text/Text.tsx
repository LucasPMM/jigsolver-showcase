import { type ComponentChildren, createElement, type JSX } from 'preact'
export type TextTag =
  | 'p'
  | 'span'
  | 'strong'
  | 'small'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
export type TextProps = JSX.HTMLAttributes<HTMLElement> & {
  as?: TextTag
  children?: ComponentChildren
}
/** Keep typography semantic; styling belongs to the caller's className. */
export const Text = ({ as: Tag = 'p', children, ...props }: TextProps) =>
  createElement(Tag, props, children)
