import { useShowcase } from '../../../contexts/ShowcaseContext'
import { asset } from '../../../data/media'
import { Button } from '../../ui/Button'
import { GitHubAvatar } from '../../ui/GitHubAvatar'
import { Icon } from '../../ui/Icon'
import { Text } from '../../ui/Text'

export const About = () => {
  const { c } = useShowcase()

  return (
    <section className="section-wrap about section-pad">
      <div className="about-symbol">
        <Icon name="puzzle" size={65} />
        <Text as="span">+</Text>
      </div>
      <div>
        <Text as="span" className="eyebrow">
          {c.aboutEyebrow}
        </Text>
        <Text as="h2">{c.aboutTitle}</Text>
        <Text>{c.aboutText}</Text>
        <Button
          variant="secondary"
          href={asset('documents/jigsolver-banner.pdf')}
          target="_blank"
          rel="noopener noreferrer"
        >
          {c.posterLink}
        </Button>
        <div className="author">
          <GitHubAvatar username="LucasPMM" name="Lucas Paulo Martins Mariz" />
          <div>
            <Text as="strong">{c.author}</Text>
            <Text as="small">{c.university}</Text>
          </div>
        </div>
      </div>
    </section>
  )
}
