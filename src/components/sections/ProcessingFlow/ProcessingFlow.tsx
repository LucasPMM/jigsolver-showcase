import type { ComponentProps } from 'preact'
import { useShowcase } from '../../../contexts/ShowcaseContext'
import { MethodArt } from '../../illustrations/MethodArt'
import { RefinementArt } from '../../illustrations/RefinementArt'
import { SideProfileArt } from '../../illustrations/SideProfileArt'
import { Pressable } from '../../ui/Pressable'
import { Text } from '../../ui/Text'

type MethodKind = ComponentProps<typeof MethodArt>['kind']
const segmentVariants = ['otsu', 'mobileSam'] as const
const poseVariants = ['rgba', 'registration', 'contrast'] as const
const visuals = [
  'capture',
  'segmentation',
  'sideProfile',
  'poses',
  'assignment',
  'refinement',
  'assembly'
] as const

export const ProcessingFlow = () => {
  const { c } = useShowcase()
  const flow = c.processingFlow
  const renderVariants = (
    variants: ReadonlyArray<MethodKind & keyof typeof c.methodGuide.topics>
  ) => (
    <div className="processing-variants">
      {variants.map((kind) => (
        <Pressable
          className="processing-variant"
          key={kind}
          href={`#method-${kind}`}
        >
          <MethodArt kind={kind} />
          <Text as="span">{c.methodGuide.topics[kind].title}</Text>
        </Pressable>
      ))}
    </div>
  )

  const art = (visual: (typeof visuals)[number]) => {
    switch (visual) {
      case 'sideProfile':
        return <SideProfileArt labels={c.methodGuide.sideLabels} />
      case 'refinement':
        return <RefinementArt labels={flow.refinement.labels} />
      case 'assignment':
        return (
          <Pressable className="processing-variant" href="#method-hungarian">
            <MethodArt kind="assignment" />
            <Text as="span">{flow.assignmentExample}</Text>
          </Pressable>
        )
      case 'segmentation':
        return renderVariants(segmentVariants)
      case 'poses':
        return renderVariants(poseVariants)
      default:
        return <MethodArt kind={visual} />
    }
  }

  return (
    <section
      className="processing-flow"
      id="processing-flow"
      aria-labelledby="processing-flow-title"
    >
      <Text as="h3" id="processing-flow-title">
        {flow.title}
      </Text>
      <Text>{flow.intro}</Text>
      <ol>
        {flow.stages.map(({ title, detail }, index) => (
          <li
            className="processing-node"
            id={visuals[index] === 'assignment' ? 'flow-hungarian' : undefined}
            key={visuals[index]}
          >
            <Text as="span" className="processing-number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </Text>
            <div className="processing-copy">
              <Text as="h4">{title}</Text>
              <Text>{detail}</Text>
            </div>
            <div className="processing-art">{art(visuals[index])}</div>
          </li>
        ))}
      </ol>
    </section>
  )
}
