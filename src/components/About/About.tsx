import { useShowcase } from '../../context/ShowcaseContext'
import { Icon } from '../Icon'

export const About = () => {
  const { c } = useShowcase()

  return (
    <section className="section-wrap about section-pad">
      <div className="about-symbol">
        <Icon name="puzzle" size={65} />
        <span>+</span>
      </div>
      <div>
        <span className="eyebrow">{c.aboutEyebrow}</span>
        <h2>{c.aboutTitle}</h2>
        <p>{c.aboutText}</p>
        <div className="author">
          <span className="author-avatar">LP</span>
          <div>
            <strong>{c.author}</strong>
            <small>{c.university}</small>
          </div>
        </div>
      </div>
    </section>
  )
}
