import { useShowcase } from '../../../contexts/ShowcaseContext'
import {
  adjacentReadyMedia,
  asset,
  demoMediaIndices,
  media
} from '../../../data/media'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { Pressable } from '../../ui/Pressable'
import { ShouldRender } from '../../ui/ShouldRender'
import { Text } from '../../ui/Text'
import { Video } from '../../ui/Video'

export const MediaDialog = () => {
  const {
    fallbackOpen,
    mediaIndex,
    hasMetadata,
    setHasMetadata,
    playback,
    setPlayback,
    error,
    setError,
    dialog,
    video,
    c,
    close,
    open,
    restart,
    playCurrent,
    expand
  } = useShowcase()
  const item = media[mediaIndex]
  const detailIndex = demoMediaIndices.indexOf(mediaIndex)
  const description =
    detailIndex >= 0 ? c.demos[detailIndex] : c.featuredVideos[mediaIndex]
  return (
    <dialog
      ref={dialog}
      className="media-dialog"
      aria-labelledby="demo-dialog-title"
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          close()
        }
      }}
      onClick={(e) => {
        if (e.target === dialog.current) {
          close()
        }
      }}
    >
      <div className="dialog-content">
        <div className="dialog-header">
          <div>
            <Text as="span" className="micro-label">
              {description.category}
            </Text>
            <Text as="h3" id="demo-dialog-title">
              {description.title}
            </Text>
          </div>
          <Pressable
            className="icon-button"
            onClick={close}
            aria-label={c.close}
          >
            <Icon name="close" />
          </Pressable>
        </div>
        <ShouldRender if={fallbackOpen}>
          <Video
            ref={video}
            src={asset(item.src)}
            autoPlay={fallbackOpen}
            muted
            loop
            controls
            playsInline
            preload="auto"
            poster={asset(item.poster)}
            aria-label={description.title}
            aria-describedby="demo-dialog-description"
            onLoadStart={() => {
              setHasMetadata(false)
              setPlayback('loading')
            }}
            onLoadedMetadata={() => setHasMetadata(true)}
            onPlaying={() => {
              setPlayback('playing')
              setError(false)
            }}
            onPause={() => {
              if (fallbackOpen) {
                setPlayback('paused')
              }
            }}
            onWaiting={() => {
              if (fallbackOpen) {
                setPlayback('loading')
              }
            }}
            onError={() => {
              setError(true)
              setPlayback('error')
            }}
          />
        </ShouldRender>
        <ShouldRender if={error}>
          <Text role="alert">{c.mediaUnavailable}</Text>
        </ShouldRender>
        <ShouldRender
          if={!error && (playback === 'blocked' || playback === 'loading')}
        >
          <Text className="playback-status" role="status">
            {playback === 'blocked' ? c.playbackBlocked : c.loadingVideo}
          </Text>
        </ShouldRender>
        <Text id="demo-dialog-description" className="dialog-caption">
          {description.desc}
        </Text>
        <div className="dialog-controls">
          <Button
            variant="secondary"
            onClick={() => open(adjacentReadyMedia(mediaIndex, -1), false)}
            aria-label={c.previous}
          >
            ←
          </Button>
          <Button variant="secondary" onClick={playCurrent}>
            {c.play}
          </Button>
          <Button variant="secondary" onClick={restart}>
            {c.replay}
          </Button>
          <Button variant="secondary" onClick={expand} disabled={!hasMetadata}>
            {c.fullscreen}
          </Button>
          <Button
            variant="secondary"
            onClick={() => open(adjacentReadyMedia(mediaIndex, 1), false)}
            aria-label={c.next}
          >
            →
          </Button>
        </div>
        <ShouldRender
          if={error || playback === 'blocked' || playback === 'loading'}
        >
          <Pressable
            className="direct-video-link"
            href={asset(item.src)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {c.openVideoFile}
          </Pressable>
        </ShouldRender>
      </div>
    </dialog>
  )
}
