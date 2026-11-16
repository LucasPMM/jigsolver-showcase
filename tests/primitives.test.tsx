import { describe, expect, it, vi } from 'vitest'
import { Button } from '../src/components/ui/Button'
import { Pressable } from '../src/components/ui/Pressable'
import { ShouldRender } from '../src/components/ui/ShouldRender'
import { Text } from '../src/components/ui/Text'

describe('UI primitives', () => {
  it('uses a native non-submit button by default', () => {
    const element = Pressable({ children: 'Open', disabled: true })
    expect(element.type).toBe('button')
    expect(element.props.type).toBe('button')
    expect(element.props.disabled).toBe(true)
  })
  it('preserves an explicit submit action', () => {
    expect(Pressable({ type: 'submit' }).props.type).toBe('submit')
  })
  it('makes loading buttons disabled and exposes busy state', () => {
    const element = Button({
      loading: true,
      loadingLabel: 'Saving',
      children: 'Save'
    })
    expect(element.props.disabled).toBe(true)
    expect(element.props['aria-busy']).toBe(true)
    expect(element.props.children.type).toBe(ShouldRender)
    expect(element.props.children.props.if).toBe(true)
    expect(element.props.children.props.children).toBe('Saving')
  })
  it('preserves text semantics', () => {
    expect(Text({ as: 'h2', children: 'Heading' }).type).toBe('h2')
    expect(Text({ children: 'Paragraph' }).type).toBe('p')
  })
  it('does not render a false condition', () => {
    expect(ShouldRender({ if: false, children: 'Details' })).toBeNull()
    expect(ShouldRender({ if: true, children: 'Details' })).not.toBeNull()
  })
})

describe('semantic navigation primitives', () => {
  it('renders real anchors, retaining URL, target, and safe new-tab behavior', () => {
    const link = Pressable({
      href: 'https://example.com',
      target: '_blank',
      children: 'Visit'
    })
    expect(link.type).toBe('a')
    expect(link.props.href).toBe('https://example.com')
    expect(link.props.target).toBe('_blank')
    expect(link.props.rel).toContain('noopener')
    expect(link.props.rel).toContain('noreferrer')
    expect(link.props.role).toBeUndefined()
  })
  it('keeps same-page navigation as an anchor', () => {
    const link = Pressable({ href: '#photographed', children: 'Photographs' })
    expect(link.type).toBe('a')
    expect(link.props.href).toBe('#photographed')
  })
  it('disables links without leaving an active destination', () => {
    const onClick = vi.fn()
    const preventDefault = vi.fn()
    const link = Pressable({ href: '/destination', disabled: true, onClick })
    expect(link.props.href).toBeUndefined()
    expect(link.props['aria-disabled']).toBe(true)
    expect(link.props.tabIndex).toBe(-1)
    link.props.onClick({ preventDefault })
    expect(preventDefault).toHaveBeenCalledOnce()
    expect(onClick).not.toHaveBeenCalled()
  })
  it('allows styled Buttons to remain links', () => {
    const button = Button({
      href: '/read-more',
      variant: 'secondary',
      children: 'Read more'
    })
    const link = Pressable(button.props)
    expect(link.type).toBe('a')
    expect(link.props.href).toBe('/read-more')
  })
  it('supports a conditional fallback and semantic captions', () => {
    expect(
      ShouldRender({ if: false, fallback: 'Unavailable', children: 'Ready' })
    ).toBe('Unavailable')
    expect(Text({ as: 'figcaption', children: 'Photograph' }).type).toBe(
      'figcaption'
    )
    expect(Text({ as: 'em', children: 'Emphasis' }).type).toBe('em')
  })
})
