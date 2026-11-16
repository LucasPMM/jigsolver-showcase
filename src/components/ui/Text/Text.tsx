import { createElement, type JSX } from 'preact'
import type { PropsWithChildren } from 'preact/compat'
export type TextTag =
  | 'p'
  | 'span'
  | 'strong'
  | 'small'
  | 'em'
  | 'b'
  | 'i'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'figcaption'
  | 'label'
  | 'legend'
  | 'code'
export type TextProps = PropsWithChildren<
  Omit<JSX.HTMLAttributes<HTMLElement>, 'children'> & { as?: TextTag }
>
/** Keep typography semantic; styling belongs to the caller's className. */
export const Text = ({ as: Tag = 'p', children, ...props }: TextProps) =>
  createElement(Tag, props, children)
