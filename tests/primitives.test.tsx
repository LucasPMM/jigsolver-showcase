import { describe, expect, it } from 'vitest'
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
    expect(element.props.children).toBe('Saving')
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
