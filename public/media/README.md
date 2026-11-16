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
