import { useShowcase } from '../../../contexts/ShowcaseContext'
import { Icon } from '../../ui/Icon'
import { Pressable } from '../../ui/Pressable'
import { ShouldRender } from '../../ui/ShouldRender'
import { Text } from '../../ui/Text'

export const Footer = () => {
  const { credits, setCredits, c } = useShowcase()

  return (
    <footer className="section-wrap footer">
      <Pressable className="brand" href="#top">
        <Text as="span" className="brand-mark">
          <Icon name="puzzle" />
        </Text>
        JigSolver.
      </Pressable>
      <Text>{c.footer}</Text>
      <Text as="small" className="footer-version">
        {c.version} {import.meta.env.VITE_APP_VERSION}
      </Text>
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
          <Pressable
            className="credit-link"
            href="https://github.com/LucasPMM/jigsolver-showcase"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub · jigsolver-showcase ↗
          </Pressable>
        </div>
      </ShouldRender>
    </footer>
  )
}
