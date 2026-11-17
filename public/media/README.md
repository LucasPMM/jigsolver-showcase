# Media provenance

Captured from the local JigSolver on 2026-11-16. Three different journeys are shown, rather than repeating the same reconstruction at different sizes. All assets remain local for review; this task did not commit or deploy them.

## Clips

- **overview.mp4 — Workspace exploration (about 10.8 s).** Actual zoom, 90-degree rotation, and panning of the already assembled built-in **Mona Lisa** synthetic demo (10 × 5, 50 pieces). Pointer/wheel and toolbar actions were performed in the app. This is interaction with a completed example, not another reconstruction run.
- **desktop.mp4 — Guided reconstruction (about 10 s).** Actual recorded replay of the computed reference-guided solution for **The Starry Night**, 8 × 10 (80 synthetic pieces). This illustrates the replay, not algorithm execution time or a general accuracy claim.
- **mobile.mp4 — Assistant mode navigation (about 9.2 s).** An actual browser screencast of clicking Scan → Find Borders → Assemble → Find Piece in a 430 × 932 responsive viewport. It shows the preparation screens only. No camera was started, no image was uploaded, no segmentation/recognition was run, and no physical-phone test is implied. The account/puzzle header is cropped out.

The mobile recording preserves its actual event timestamps and transitions; the interface is naturally stationary between clicks. Desktop and workspace-exploration recordings composite the recorded canvas at its original coordinates into a real screenshot of the corresponding fullscreen workspace. Those surrounding toolbar pixels are static; the canvas shows the actual response to the actions. No artificial piece motion, generated result, or editorial zoom was introduced. Editing is limited to crop, sizing, fades, and compression.

## Privacy and scope

No admin UI, account menu, credentials, private source, or dinosaur reference illustration is included. The assistant shows the existing scanned-piece count but no piece images. Synthetic demo pieces are temporary; the underlying stored puzzle and private project code were not modified.

## Artwork attribution

- Leonardo da Vinci, *Mona Lisa*, public-domain painting. Application source: https://commons.wikimedia.org/wiki/File:Leonardo_da_Vinci_-_Mona_Lisa.jpg
- Vincent van Gogh, *The Starry Night* (1889), public-domain painting. Application source: https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg

## Playback

Desktop and overview: H.264 Constrained Baseline level 4.0, 1920 × 1080 output, CRF 17, source-native canvas pixels (1878 px wide) placed in the original 1920-pixel interface capture. Extra space is padding, not an upscale. Mobile: a fresh JPEG-quality-100 screencast, 430 × 868 after cropping, CRF 16, baseline level 3.1; its native 430-pixel width is retained. All outputs use yuv420p, 30 fps, one-second keyframes, faststart MP4 and no audio. Posters are lossless WebP. Each clip has a WebP poster and Portuguese/English WebVTT captions. Capture frame rate varies; repeated output frames preserve timing rather than invent intermediate motion. Full decode and representative frames were checked locally.

A separate transport check of the previously published overview returned HTTP 206 for GET Range bytes=0-1023, Content-Type video/mp4, Accept-Ranges bytes, and a valid Content-Range. This confirms that response's MIME/range support, not iPad autoplay behavior or publication of these new assets.


## Photographed physical pieces

`photographed-sea.png` and `photographed-land.png` are unchanged copies of historical qualitative comparison panels generated on 2026-08-23. They show a physical marine-animal puzzle piece photographed on granite and an elephant puzzle piece photographed on wood. These are photographs, not synthetic puzzle cuts.

Each 1292 × 520 panel pairs the same photograph and localization prompt with actual Classical and MobileSAM outputs from that evaluation. The report used MobileSAM vit_t on CPU, box-point prompting and validated model-score candidate selection; it explicitly did not change persisted analyses. There were no independently reviewed ground-truth masks for these cases. The visible contrast between these two outputs must not be presented as a benchmark accuracy, IoU, universal superiority, or successful reconstruction.

The original photograph includes the prompt box/point; the output panels show extracted foreground and a boundary over a checkerboard background. Display cropping may hide the technical header but must not replace or redraw the source/result pixels. Original panel hashes: sea `9fa6acbc677ea93bda712335ab1e9df8789122e34372ff03157c5efc627a2a97`; land `cf0d991efd67ee9e546da18015375b77a207d1519847d371c251b351f53ad675`.

Rights: the local reports do not identify the photographer, puzzle-art creator, or a redistribution license. No public-domain or Creative Commons claim is made for these photographs/printed illustrations. They are included for the owner's requested local review; confirm the appropriate rights/attribution before public distribution.


The corresponding higher-resolution original photographs are provided as `photographed-sea-original.jpg` and `photographed-land-original.jpg` (960 × 1280). Their visual correspondence to the panel photographs was checked. They do not contain the added localization overlay. The original JPEG pixel streams were copied unchanged; no APP1 metadata was present. No higher-resolution segmentation output from the exact historical run was verified, so the historical comparison panels remain the source for the extracted-foreground illustrations. Do not substitute a current processed piece and imply it belongs to that past run.


## Photographed assembly demonstration (2026-11-16)

`photographed-assembly.mp4`, `.webp`, `.pt.vtt`, `.en.vtt`: the actual local app-generated solution GIF for the 30-piece photographed sea-life puzzle, converted to H.264. The user authorized this demonstration. The solve used Assignment and local search (`assignment-local-search-partial-evidence-v2`), input snapshot `920fb4a6545d`, and completed in 2651 ms. The UI reported 30/30 placed, zero physically confirmed, and 58% internal mean confidence. Confidence is not independently measured accuracy. The visible result has small photographic/contour seams; no piece placements or result pixels were corrected.

The source is a native 1228×1054, 38-frame animation exported by JigSolver, not a live recording of computation. Playback is slowed to 0.8× (timestamps multiplied by 1.25), with 30 fps frame repetition, no interpolated motion. Native pixels are retained and side padding creates a 1874×1054 frame; this is not higher-resolution source detail. The GIF color palette is preserved. Source GIF is retained in ignored `.media-work/photographed-assembly-source.gif`.

A new solve execution/result was created through the app; photos, piece analysis, puzzle configuration, and physical confirmations were not edited. Printed puzzle artwork licensing is not documented; no public-domain or third-party-rights claim is made. Assets remain for local review; no publication or commit was performed.


## Overview replacement (2026-11-17)
The current overview replaces the Mona Lisa workspace interaction with the complete existing Starry Night replay followed by the photographed sea-life proposal. Sources are the actual clips documented above. A 350 ms crossfade joins them; there is no fabricated piece motion or new reconstruction claim. The 1874×1054 photographed clip is padded, not enlarged. The overview is an edited showcase, not wall-clock computation. Both segments retain their limitations.

## iOS playback limits
All clips have no audio track and use muted/defaultMuted/playsinline. Browser or Low Power Mode policy can still reject autoplay; no site can guarantee bypassing that policy. Inline previews now resynchronize after native fullscreen dismissal, including a delayed Safari pause event, while respecting reduced motion, visibility, and the site pause control. Physical iOS verification remains required.

## Academic poster
`public/documents/jigsolver-banner.pdf` is an unchanged copy of the PDF supplied by Lucas on 2026-11-17, linked from the project section in both languages. It is a Portuguese academic poster.


## User-provided recordings, 2026-11-17

- `mobile.mp4` now uses Lucas's actual Android Dinossauro session: puzzle list → overview → initial digitized-piece board → photographed piece details. Four source ranges (1–7, 9–14, 17–24 and 33–41 seconds) are played at 1.2× with 250 ms dissolves. Source resolution is 480×1040; the delivered crop is 480×880. It is not an HD recording and is not artificially upscaled.
- `assistant.mp4` uses the supplied real camera recording (480×1046, delivered crop 480×886, approximately 11 seconds). It begins with the camera already active; there is no captured Start-button interaction. The visible classifier reports **Uncertain**, which is preserved. This demonstrates capture/detection, not successful recognition or completed assembly.
- Both recordings remove Android status/navigation chrome and browser address controls, strip audio and metadata, use H.264 Main/yuv420p at 30 fps, CRF 18, two-second keyframe spacing and fast-start MP4. Posters are actual frames, not mockups. Inspection found no credentials, private messages or identifying personal data in the retained footage.
- Follow-up captures below replace the older desktop, Terra and Dinosaur material. The camera source does not include the initial Start-button interaction; this missing moment is not fabricated.


## Desktop and Animais Terra captures, 2026-11-17

- `desktop.mp4` (13.43 s, 1280×800) is a real local desktop Dinossauro session: overview → digitized pieces on the board → selection → individual photo and extracted-piece details. It follows the same conceptual journey as the supplied mobile recording. The board is the initial digitized-piece arrangement, not a solved proposal. Browser/account chrome and the administrative sidebar are cropped out. Small editorial zooms and 300 ms dissolves improve legibility; they are not represented as application interactions.
- `pieces.mp4` (12.13 s, 1280×800) shows the actual Animais Terra grid, a close-up of Piece #0's original photograph and transparent-background extraction, then the application's own exported reconstruction GIF. The UI shows the extracted colored piece, not a separate binary-mask image. The source GIF is 1236×1046, generated by the local application on this date. Its 20 placed pieces, zero physically confirmed pieces and 65% internal mean confidence are not an accuracy measurement.
- Source screencast frames are genuine Chrome tab captures, retained locally outside the committed source. Long operator pauses and loading intervals are omitted; the order of the recorded interactions is retained. Screens contain no credentials or private messages. Encodes use H.264 Main/yuv420p, 30 fps, CRF 18, fast-start MP4, no audio and no source metadata. PT/EN/FR caption files describe the same footage.


## Dinossauro interaction and reconstruction, 2026-11-17

- `explore.mp4` (11.63 s, 1280×800) records actual selection of Piece #73, dragging a connected group away from the reconstructed board and returning it, then opening the piece's original photo, extraction and placement details. Only operator pauses and the viewport-resize transition are removed. The final detail close-up is editorial. No physical-placement confirmation is performed; digital manipulation is not evidence of assembly on the table. Administrative navigation and account identity are cropped out.
- `photographed-assembly.mp4` (10.43 s, 1280×960) now replaces the older sea-life preview with the application's own **Dinossauro** solution export (source GIF 1136×1140, 38 frames). The real replay is slowed to half speed for readability and ends with a two-second hold. All 100 pieces are digitally placed; zero are physically confirmed. The reported 57% internal mean confidence is not measured correctness.
- Both files use H.264 Main/yuv420p, 30 fps, CRF 18, fast-start MP4, no audio and no source metadata. Actual captured frames supply the posters. PT/EN/FR captions are synchronized.

## The Bedroom saved-output replay, 2026-11-17

`overview.mp4` replaces the older montage with a board-only **The Bedroom** presentation, 1600×1252 at 30 fps, 12 seconds, H.264 Main/yuv420p, CRF 18, no audio, fast-start MP4. It uses the actual processed RGBA evidence and the 99 recorded placements from the clean-capture 100-piece MobileSAM / guided visual registration + contrast experimental result dated 2026-10-28. Each processed image was verified against its recorded SHA-256 before rendering. Original artwork: Vincent van Gogh, *The Bedroom* (1889), [Art Institute of Chicago Open Access](https://www.artic.edu/artworks/28560), public domain/CC0.

This is an **editorial visualization of saved output**, not a screen recording of inference and not a claim about inference order, execution speed or physical assembly. Placement coordinates, rotations and body bounds come from the actual solution. Small entrance translations and opacity changes are presentation effects only. The final hold uses the original saved assembly image directly. The unplaced piece and segmentation defects remain visible; no missing image content is filled in and no placement is corrected. The benchmark reports 99% exact pose and placed coverage for this case only; those values must not be generalized to all puzzles. No administrative UI, account data or private source is included. PT/EN/FR captions describe the replay accurately.


## Motion polish, 2026-11-17

This section supersedes the timing/effects above for the current files. `desktop.mp4`, `pieces.mp4`, and `explore.mp4` retain their recorded actions and existing scene/caption boundaries. Editorial close-ups now reach their target in 0.7 seconds with cubic ease-out, then hold for reading, instead of a barely perceptible 3–4 second linear drift. A 4× working raster reduces integer-coordinate jitter; this does not add source detail. Close-up magnification is 7% for overview/grid frames and 12% for paired photograph/extraction details.

`photographed-assembly.mp4` still uses the same 38 genuine Dinossauro export states, the same half-speed narrative and final hold. Short 140 ms smoothstep dissolves between successive recorded states remove hard stepping. These are editorial transitions, not newly estimated physical trajectories or new reconstruction results. No optical-flow warping, invented placements or result retouching is applied.

`overview.mp4` plays the same saved-output Bedroom presentation at 1.5× (8 seconds rather than 12). All three WebVTT files are retimed by the same factor. The replay remains an editorial visualization, not inference timing. The playback component is unchanged: no external caption tracks are restored, preserving the verified iPad workaround. All five assets remain silent H.264 Main/yuv420p, 30 fps, fast-start MP4. Media revision v10 invalidates stale URLs.
