import { useShowcase } from '../../context/ShowcaseContext'
import { Icon } from '../Icon'

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
      <p>{c.footer}</p>
      <button
        type="button"
        onClick={() => setCredits(!credits)}
        aria-expanded={credits}
      >
        {c.credits} {credits ? '−' : '+'}
      </button>
      {credits && (
        <div className="credits">
          <p>{c.creditText}</p>
          <a
            className="credit-link"
            href="https://github.com/LucasPMM/jigsolver-showcase"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub · jigsolver-showcase ↗
          </a>
        </div>
      )}
    </footer>
  )
}
