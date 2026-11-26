import { useShowcase } from '../../../contexts/ShowcaseContext'
import { Icon } from '../../ui/Icon'
import { Text } from '../../ui/Text'

const cues = ['neighbors', 'poses', 'reference'] as const
const icons = { neighbors: 'puzzle', poses: 'grid', reference: 'scan' } as const

export const RelatedProblemsSynthesis = () => {
  const { c } = useShowcase()
  const { title, summary, result } = c.methodGuide.related.synthesis

  return (
    <section
      id="related-problems-synthesis"
      className="method-synthesis"
      aria-labelledby="related-problems-title"
    >
      <Text as="h4" id="related-problems-title">
        {title}
      </Text>
      <Text className="method-summary">{summary}</Text>
      <ul className="method-synthesis-cues">
        {cues.map((cue) => {
          const { title: label, detail } = c.methodGuide.related.synthesis[cue]
          return (
            <li key={cue} className="method-synthesis-cue">
              <div className="method-synthesis-icon" aria-hidden="true">
                <Icon name={icons[cue]} size={23} />
              </div>
              <Text as="strong">{label}</Text>
              <Text className="method-summary">{detail}</Text>
            </li>
          )
        })}
      </ul>
      <div className="method-synthesis-result">
        <div className="method-synthesis-down" aria-hidden="true">
          <Icon name="arrow" size={16} />
        </div>
        <Text as="strong">JigSolver</Text>
        <Text className="method-summary">{result}</Text>
      </div>
    </section>
  )
}
