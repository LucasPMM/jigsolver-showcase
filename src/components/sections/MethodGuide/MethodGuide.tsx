import { useShowcase } from '../../../contexts/ShowcaseContext'
import { MethodArt } from '../../illustrations/MethodArt'
import { RefinementArt } from '../../illustrations/RefinementArt'
import { SideProfileArt } from '../../illustrations/SideProfileArt'
import { Text } from '../../ui/Text'
import { HungarianExample } from '../HungarianExample'
import { ProcessingFlow } from '../ProcessingFlow'

const groups = [
  ['otsu', 'mobileSam', 'sideProfile'],
  ['rgba', 'registration', 'contrast', 'hungarian', 'refinement'],
  ['edges', 'packing']
] as const

export const MethodGuide = () => {
  const { c } = useShowcase()
  const guide = c.methodGuide
  return (
    <section
      id="methods"
      className="section-wrap section-pad method-guide"
      aria-labelledby="methods-title"
    >
      <div className="section-heading">
        <Text as="span" className="eyebrow">
          {guide.eyebrow}
        </Text>
        <Text as="h2" id="methods-title">
          {guide.title}
        </Text>
        <Text>{guide.intro}</Text>
        <Text as="small" className="method-visual-note">
          {guide.illustrationNote}
        </Text>
      </div>
      <ProcessingFlow />
      {groups.map((group, i) => (
        <section
          className="method-group"
          key={group[0]}
          aria-labelledby={`methods-${group[0]}`}
        >
          <Text as="h3" id={`methods-${group[0]}`}>
            {guide.groupNames[i]}
          </Text>
          <div className="method-grid">
            {group.map((id) => {
              const { title, summary, steps } =
                id === 'refinement'
                  ? {
                      ...c.processingFlow.refinement,
                      summary: c.processingFlow.refinement.detail
                    }
                  : guide.topics[id]
              return (
                <article
                  className={
                    id === 'sideProfile' || id === 'refinement'
                      ? 'method-card method-side-card'
                      : 'method-card'
                  }
                  aria-labelledby={`method-${id}`}
                  key={id}
                >
                  <Text as="h4" id={`method-${id}`}>
                    {title}
                  </Text>
                  <Text className="method-summary">{summary}</Text>
                  {id === 'hungarian' ? (
                    <HungarianExample />
                  ) : id === 'refinement' ? (
                    <div className="method-art">
                      <RefinementArt
                        labels={c.processingFlow.refinement.labels}
                      />
                    </div>
                  ) : id === 'sideProfile' ? (
                    <div className="method-art">
                      <SideProfileArt labels={guide.sideLabels} />
                    </div>
                  ) : (
                    <div className="method-art">
                      <MethodArt kind={id} />
                    </div>
                  )}
                  <ol className="method-steps">
                    {steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </article>
              )
            })}
          </div>
        </section>
      ))}
    </section>
  )
}
