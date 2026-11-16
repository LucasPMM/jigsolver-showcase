import { useShowcase } from '../../../contexts/ShowcaseContext'
import { asset } from '../../../data/media'
import { panelCrop, photographed } from '../../../data/photographed'
import { Image } from '../../ui/Image'
import { Pressable } from '../../ui/Pressable'
import { Text } from '../../ui/Text'

export const Photographed = () => {
  const { c } = useShowcase()
  return (
    <section
      id="photographed"
      className="section-wrap section-pad photographed-section"
    >
      <div className="section-heading">
        <Text as="span" className="eyebrow">
          {c.photosEyebrow}
        </Text>
        <Text as="h2">{c.photosTitle}</Text>
        <Text>{c.photosIntro}</Text>
      </div>
      {photographed.map((example, exampleIndex) => (
        <article className="photo-example" key={example.id}>
          <Text as="h3">{c.photoExamples[exampleIndex].title}</Text>
          <div className="photo-comparison">
            {c.photoColumns.map((label, column) => (
              <figure key={label}>
                <div
                  className="photo-crop"
                  style={{
                    aspectRatio: `${panelCrop.cropWidth} / ${panelCrop.cropHeight}`
                  }}
                >
                  <Image
                    fullscreen
                    fullscreenLabel={`${c.viewImage}: ${c.photoExamples[exampleIndex].alts[column]}`}
                    fullscreenAlt={
                      column === 0
                        ? c.photoExamples[exampleIndex].alts[column]
                        : c.photoOriginal
                    }
                    closeLabel={c.closeImage}
                    unavailableLabel={c.imageUnavailable}
                    src={asset(column === 0 ? example.original : example.src)}
                    loading="lazy"
                    alt={c.photoExamples[exampleIndex].alts[column]}
                    style={
                      column === 0
                        ? {
                            width: '100%',
                            height: '100%',
                            left: 0,
                            top: 0,
                            objectFit: 'cover'
                          }
                        : {
                            width: `${(100 * panelCrop.width) / panelCrop.cropWidth}%`,
                            left: `${(-100 * panelCrop.left[column]) / panelCrop.cropWidth}%`,
                            top: `${(-100 * panelCrop.top) / panelCrop.cropHeight}%`
                          }
                    }
                  />
                </div>
                <Text as="figcaption">{label}</Text>
              </figure>
            ))}
          </div>
          <Pressable
            className="photo-original"
            href={asset(example.src)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.photoOriginal} ↗
          </Pressable>
        </article>
      ))}
      <Text className="photo-note">{c.photosNote}</Text>
    </section>
  )
}
