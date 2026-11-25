import { useShowcase } from '../../../contexts/ShowcaseContext'
import { MethodArt } from '../../illustrations/MethodArt'
import { Text } from '../../ui/Text'
import { HungarianExample } from '../HungarianExample'

const groups = [
  ['otsu', 'mobileSam'],
  ['rgba', 'registration', 'contrast', 'hungarian'],
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
              const { title, summary, steps } = guide.topics[id]
              return (
                <article
                  className="method-card"
                  aria-labelledby={`method-${id}`}
                  key={id}
                >
                  <Text as="h4" id={`method-${id}`}>
                    {title}
                  </Text>
                  <Text className="method-summary">{summary}</Text>
                  {id === 'hungarian' ? (
                    <HungarianExample />
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
