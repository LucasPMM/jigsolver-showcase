// Bump this when replacing public media so returning devices do not reuse stale clips.
const MEDIA_REVISION = '20261116-showcase-v5'
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
    src: 'media/mobile.mp4',
    poster: 'media/mobile.webp',
    ready: true
  },
  {
    id: 'photographed-assembly',
    src: 'media/photographed-assembly.mp4',
    poster: 'media/photographed-assembly.webp',
    ready: true
  }
]
