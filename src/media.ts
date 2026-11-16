export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
// Capture metadata is maintained separately from UI copy. See public/media/README.md.
export const media = [
  {
    id: 'overview',
    src: 'media/overview.mp4',
    poster: 'media/overview.webp',
    duration: '0:17',
    ready: true
  },
  {
    id: 'desktop',
    src: 'media/desktop.mp4',
    poster: 'media/desktop.webp',
    duration: '0:12',
    ready: true
  },
  {
    id: 'mobile',
    src: 'media/mobile.mp4',
    poster: 'media/mobile.webp',
    duration: '0:10',
    ready: true
  }
]
