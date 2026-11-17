// Bump this when replacing public media so returning devices do not reuse stale clips.
const MEDIA_REVISION = '20261117-showcase-v9'
export const asset = (path: string) => {
  const normalized = path.replace(/^\//, '')
  const revision = normalized.startsWith('media/') ? `?v=${MEDIA_REVISION}` : ''
  return `${import.meta.env.BASE_URL}${normalized}${revision}`
}
// Capture metadata is maintained separately from UI copy. See public/media/README.md.
export const media = [
  {
    id: 'overview',
    src: 'media/overview.mp4',
    poster: 'media/overview.webp',
    ready: true
  },
  {
    id: 'desktop',
    src: 'media/desktop.mp4',
    poster: 'media/desktop.webp',
    ready: true
  },
  {
    id: 'mobile',
    portrait: true,
    src: 'media/mobile.mp4',
    poster: 'media/mobile.webp',
    ready: true
  },
  {
    id: 'photographed-assembly',
    src: 'media/photographed-assembly.mp4',
    poster: 'media/photographed-assembly.webp',
    ready: true
  },
  {
    id: 'pieces',
    src: 'media/pieces.mp4',
    poster: 'media/pieces.webp',
    ready: true
  },
  {
    id: 'explore',
    src: 'media/explore.mp4',
    poster: 'media/explore.webp',
    ready: true
  },
  {
    id: 'assistant',
    src: 'media/assistant.mp4',
    poster: 'media/assistant.webp',
    portrait: true,
    ready: true
  }
]

/** Hero and device journeys are independent from the four detailed demonstrations. */
export const demoMediaIndices: ReadonlyArray<number> = [4, 5, 6, 3]
// Dedicated footage is available for all four detailed demonstrations.
export const plannedDemoMediaIndices: ReadonlyArray<number> = [4, 5, 6, 3]

export const adjacentReadyMedia = (index: number, direction: 1 | -1) => {
  const ordered = Array.from(
    { length: media.length },
    (_, offset) =>
      (index + direction * (offset + 1) + media.length) % media.length
  )
  return ordered.find((candidate) => media[candidate].ready) ?? index
}
