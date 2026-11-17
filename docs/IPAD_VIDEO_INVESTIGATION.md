# iPad playback investigation

## Confirmed observations

- The owner reports that the direct MP4 plays in Safari and Chrome on the iPad, while the embedded player reports a loading error. This is not evidence that the file is universally unsupported.
- On 2026-11-17, the published `media/overview.mp4` returned `video/mp4`; a real byte-range GET returned HTTP 206 and `Content-Range: bytes 0-1023/5163598`. The inspected GitHub Pages endpoint supports range requests.
- The current code explicitly sets muted/defaultMuted/playsInline and preserves the source across viewport pauses. The fallback and preview involve different elements and lifecycle paths.
- A successful desktop test or a tablet-size viewport does not validate physical iPad playback. The exact iPad model, iPadOS version and MediaError code have not been captured.

## Primary-source issue research

- [WebKit 284891](https://bugs.webkit.org/show_bug.cgi?id=284891): video failure on iPad 7th generation/Safari 18 in HTML exports. This is superficially similar but does not establish a matching cause or a confirmed fix for this application.
- [WebKit 300115](https://bugs.webkit.org/show_bug.cgi?id=300115) and [301484](https://bugs.webkit.org/show_bug.cgi?id=301484): failures after reopening Home Screen applications on iOS/iPadOS 26. These are PWA-specific reports, not proof of the same bug in a regular browser tab.
- [WebKit 271828](https://bugs.webkit.org/show_bug.cgi?id=271828): an iOS 17.4.1 playback/decode report involving HLS. It should not be treated as a demonstrated explanation for this site's progressive MP4 files.
- [Video.js 8975](https://github.com/videojs/video.js/issues/8975): an iPadOS 18 HLS/Managed Media Source issue, also not the site's progressive MP4 delivery path.
- [WebKit video policies](https://webkit.org/blog/6784/new-video-policies-for-ios/) describe muted playback, inline playback and user-gesture requirements. A player library still depends on the browser's media engine and cannot bypass those policies.

No researched issue establishes this site's root cause. Adding a player dependency without a matching reproduction is not yet justified.

## Next discriminating test

A temporary, standalone HTML harness was prepared outside the application repository at `/tmp/jigsolver-ipad-diagnostic/index.html`. It uses one native video with the same public MP4, native controls and no Preact context, poster, IntersectionObserver or fullscreen wrapper. It records readyState, networkState, playback events, play rejection names and MediaError code/message locally; it uploads nothing.

Run on the development computer:

```sh
python3 -m http.server 8768 --bind 0.0.0.0 --directory /tmp/jigsolver-ipad-diagnostic
```

Connect the iPad to the same Wi-Fi and visit `http://<computer-LAN-IP>:8768`. Plain HTTP is sufficient for video playback; this harness does not request a camera. Network/firewall rules may prevent reaching the computer. Stop the temporary server after testing. The file is temporary and is not a deployable project asset.

1. Record model, iPadOS version and whether the browser is a regular tab or Home Screen app.
2. Test native Play, then direct MP4. Record any displayed error and events.
3. Use “Retry with autoplay” to test a fresh automatic load separately from gesture playback. Record Low Power Mode and reduced-motion settings without assuming either is the cause.
4. Enter and exit fullscreen with the native controls; check that manual playback remains available.
5. Compare with the showcase in the same browser/network session.

If this isolated player works while the showcase fails, focus on application lifecycle/fullscreen/concurrent-media interactions. If native inline playback also fails but direct navigation succeeds, investigate a platform-specific embedded-media limitation with the captured error. An autoplay rejection alone is different from a load/decode failure. A remote HTTPS copy of the same harness would be needed to eliminate differences between the local test origin and the published site before drawing a definitive conclusion.

## Physical-device evidence and candidate adjustment

On 2026-11-17, the owner confirmed successful playback in the isolated harness on an iPad Pro 12.9-inch (5th generation), iPadOS 27.2.1. The supplied Chrome capture records `loadedmetadata`, `loadeddata`, `canplay`, `playing` and a resolved play promise, with readyState 4 and no MediaError. This confirms native embedded playback of the tested public MP4 on that device; it does not yet validate the complete showcase or every clip.

The candidate adjustment makes preview `src`, muted inline autoplay eligibility and metadata preload declarative from mount, matching the working native baseline more closely. The viewport controller still pauses hidden/offscreen previews, but no longer alternates preload modes. Fullscreen and translations are unchanged. A regression test verifies that an existing declared source is not assigned again across visibility changes.

This is a testable application-lifecycle hypothesis, not a demonstrated root cause. Metadata may now be fetched for offscreen clips, a deliberate small loading tradeoff. Validate the local application on the same iPad before claiming resolution: initial playback, scrolling through sections, opening and exiting fullscreen, and language/theme changes. The local HTTP origin still differs from the deployed HTTPS origin.

The owner subsequently retested the full local application; the failure persisted. Therefore the declarative initialization change has **not** resolved the reported problem. The next local-only comparison is `?mediaDebug=1` versus `?mediaDebug=1&mediaSource=published`: the former retains the local source, while the latter uses the exact public MP4 URL verified by the native harness, in the same application player. An opt-in development overlay records the actual media error and play rejection. This diagnostic is not enabled in production and transmits no logs. Capture both results before making further changes.

Both comparison captures reported `MediaError.code = 4`, readyState 0 and networkState 3, including the exact public MP4 that plays in the harness. Thus neither a local-only hosting problem nor the revision query alone explains the failure. A development-only `?mediaIsolation=1` page now runs six sequential, five-second comparisons: an unmanaged native element, the shared Video primitive with controls, without controls, with a poster, with captions, and inside a button wrapper. It keeps the source fixed and avoids other application players/context. Results are displayed locally; no diagnostic requests or logs are uploaded. This isolates the minimum failing configuration before another implementation change.

## Discriminating result: external caption track

The six-case iPad capture showed the first four configurations playing for approximately 4.8–4.9 seconds with readyState 4 and no error. Adding the external `<track kind="captions">` changed the result to MediaError 4 / NotSupportedError, readyState 0 and networkState 3. The final button-wrapper case still included that track and also failed, so it does not independently implicate the wrapper.

Based on this result, the silent previews and expanded fallback no longer attach external VTT tracks to the media element. The existing descriptive text remains available in all languages; the fallback video is explicitly associated with its visible description through `aria-describedby`. VTT assets are retained, not deleted. This targets the failing configuration observed on the owner's device; it does not establish the underlying WebKit defect or imply that all caption tracks fail on all iPads. Full-page playback and fullscreen still require physical-device confirmation after this adjustment.

The owner confirmed that removing the external tracks restored playback in the complete application. A separate fullscreen-transition issue remained: the video paused on entry/exit, with no media error. The preview now subscribes to the existing pause-resumption helper, recalculates its viewport eligibility after native transitions, and retries an eligible late exit pause. Native entry gets a guarded playback handoff once the fullscreen event arrives and once on the next animation frame. Pausing through native controls is not automatically undone.

The temporary development overlays and isolated comparison route were removed from application code after identifying the track failure. The standalone harness remains only as a temporary external file. Regression checks cover the native entry callback, cleanup, respecting native pause controls and connecting the preview resume listener. Physical confirmation of the fullscreen adjustment is still pending.
