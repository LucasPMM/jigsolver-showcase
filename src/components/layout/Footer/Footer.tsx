import { useShowcase } from '../../../contexts/ShowcaseContext'
import { Icon } from '../../ui/Icon'
import { Pressable } from '../../ui/Pressable'
import { ShouldRender } from '../../ui/ShouldRender'
import { Text } from '../../ui/Text'

export const Footer = () => {
  const { credits, setCredits, c } = useShowcase()

  return (
    <footer className="section-wrap footer">
      <a className="brand" href="#top">
        <span className="brand-mark">
          <Icon name="puzzle" />
        </span>
        JigSolver.
      </a>
      <Text>{c.footer}</Text>
      <Pressable
        type="button"
        onClick={() => setCredits(!credits)}
        aria-expanded={credits}
      >
        {c.credits} {credits ? '−' : '+'}
      </Pressable>
      <ShouldRender if={credits}>
        <div className="credits">
          <Text>{c.creditText}</Text>
          <a
            className="credit-link"
            href="https://github.com/LucasPMM/jigsolver-showcase"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub · jigsolver-showcase ↗
          </a>
        </div>
      </ShouldRender>
    </footer>
  )
}
