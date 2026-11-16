# Media playback and iPad fallback

## Implementation

- Media URLs include a revision query so returning devices do not reuse an older cached clip after replacement. Bump `MEDIA_REVISION` in `src/data/media.ts` when updating public media.
- Inline previews declare `autoplay`, `muted`, and `playsinline` and use a direct video `src`.
- Before scripted playback, the media properties `muted`, `defaultMuted`, and `playsInline` are set explicitly, together with inline-playback attributes.
- An IntersectionObserver pauses offscreen previews. Reduced motion, global pause, hidden tabs, and an open expanded player also pause previews. Metadata, canplay, and page-visibility events can retry eligible silent playback.
- A blocked preview shows a text hint, not a misleading play animation. User-initiated playback remains available through the surrounding control.
- Native fullscreen uses the already-mounted preview directly, without first opening a dialog. The fallback player has a separate persistent video element and is only shown if the native request cannot be fulfilled.
- Play is invoked synchronously from the user's click handler, not after awaiting metadata or a state-update callback. Rejections are handled as blocked, interrupted, or failed playback.
- Safari's video-specific fullscreen API is used only when metadata is ready; otherwise the standard API may be used. Requests always originate from the current gesture. Standard fullscreenchange and WebKit end-fullscreen events terminate the session, restore preview controls, and return to the page. No second player is left open underneath.
- The viewport-filling dialog, native controls, explicit Play/Restart actions, and a direct media link remain available when playback or fullscreen is restricted.

## Reported symptoms and evidence

The supplied iPad screenshot showed an expanded player with a black surface and `00:00 / 00:00`, not merely a stopped animation. It also showed a yellow battery indicator. Low Power Mode can restrict automatic playback, but the screenshot alone does not establish the complete cause of the missing metadata.

The published MP4 was checked with a real byte-range GET: HTTP 206, `video/mp4`, a valid Content-Range, and the requested 1,024-byte response. This rules out a missing Range implementation at the inspected Pages endpoint, not every possible device/network issue.

The second screenshot showed staircase-shaped edges along the white video content within the rotated hero card. The video container is now axis-aligned; decorative non-video elements may still rotate.

## Testing boundaries

Unit tests cover silent-property ordering, synchronous play invocation, rejection handling, metadata gating, WebKit preference, and standard fallback. Desktop and mobile-size browser checks do not replace testing on the actual iPad. Low Power Mode, browser settings, and operating-system media policy cannot be overridden by the page.

## Official references

- [WebKit: New video policies for iOS](https://webkit.org/blog/6784/new-video-policies-for-ios/)
- [Apple: Controlling media with JavaScript](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/ControllingMediaWithJavaScript/ControllingMediaWithJavaScript.html)
- [Apple: Low Power Mode](https://support.apple.com/en-gb/101604)

Reviewed on 2026-11-16. The older WebKit/Apple guides describe the user-gesture and inline-video foundations; browser-specific behavior still requires device validation.
