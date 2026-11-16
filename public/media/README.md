# Media provenance

Captured from the running local JigSolver on 2026-11-16. No admin UI, account menu, credentials, or private source code is included. Nothing was published by this media task.

## Recordings

- `desktop.mp4` (10 s): real canvas recording of the built-in reference-guided reconstruction replay for **The Starry Night**, 8 × 10 (80 synthetic pieces).
- `mobile.mp4` (10 s): a separate real recording of the same built-in example rendered in a 430 × 932 responsive browser viewport. This is not a physical-phone recording, camera demonstration, or screenshot slideshow.
- `overview.mp4` (19.5 s): the desktop and mobile recordings joined with a 0.5-second crossfade.
- WebP posters and Portuguese/English WebVTT captions accompany each video. No audio.

The recorded canvas is composited at its original coordinates over an actual screenshot of its corresponding fullscreen workspace, preserving the controls and layout while excluding the account/navigation areas. The controls are a static surround; no interaction with them is represented. The rendering follows the application's computed replay, not the algorithm's computation time. No generated piece motion, motion interpolation, artificial zoom, replacement result, or dinosaur reference illustration is included. Only cuts, fades, sizing, and compression are editorial.

The application reported 100% on this particular synthetic demonstration. This is not a general accuracy claim or evidence of the same performance on photographed puzzles. Generated demo pieces were temporary; the underlying puzzle and private project source were not modified.

## Attribution

Vincent van Gogh, *The Starry Night* (1889), public-domain painting. The source used by the application is https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg

## Playback and diagnosis

H.264 Constrained Baseline level 3.1, yuv420p, constant 30-fps output, one-second keyframes, faststart MP4. Native capture frame rate varied; duplicate output frames preserve real elapsed time instead of inventing intermediate poses.

The previous local hero was actually advancing and looping: the inspected browser reported readyState 4, paused false, 1,643 decoded frames and only three dropped frames. The earlier source recording had sparse distinct frames, and its mobile clip was a two-screenshot montage. These replacement assets address the recording/content issue rather than claiming that a codec change alone fixed it. New capture instrumentation counted 223 animation callbacks in 10 seconds for desktop and 382 in 12 seconds for mobile.
