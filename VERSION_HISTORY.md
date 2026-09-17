# Website versions

Each update is saved in Git history. Cache-busting URL parameters refresh assets; they do not select an old version.

- v39 (before refinements): f71f79ad1bc2ec10d86e36af27bb17ab794fd606, preserved at branch `rollback/v39-before-refinements`.
- v40: French-cut beard, 30% Web Audio volume, Khat - by an atheist title, icon playback button, no playlist label, clearer envelope note, failed-password hints, transform-based page expansion. Preserved at `rollback/v40-refinements` after publishing.

For rollback, restore the selected version's tree in a new commit on main, preserving later history and refreshing the asset version token. Earlier revisions remain in Git history.

- v41: French-cut combined with full cheek/jaw beard, centered note, romantic hint-only password messages, serif player typography, petals above the player. Preserved at `rollback/v41-style-refinements`.

- v43: verified the user-supplied Khat timestamps from 00:41.6 through 04:51.6; kept opening cues unchanged and refreshed asset URLs to reload the matching timeline. Preserved at `rollback/v43-khat-timeline`.

- v44: added a subtle BTS/ARMY-inspired vintage keepsake ticket after the gift envelope opens, with purple details, seven-star motif, “One evening, your playlist, and us.” copy, responsive mobile layout, and no changes to the Khat lyric timeline or existing gift interaction. Pre-edit checkpoint: `backup-before-bts-ticket-20260917`.

- v45: fixed the BTS keepsake mounting logic so it waits for the dynamically injected gift section instead of checking only once; refreshed cache keys so the repaired script is loaded on the published page. Pre-edit checkpoint: `backup-before-bts-trigger-fix-20260917`.

- v46: removed the standalone BTS-only keepsake from v44/v45 and replaced it with a separate future-dream scrapbook section below the gift envelope. Added three layered fantasy concert tickets (Arijit Singh, Darshan Raval, and a BTS-inspired Purple Hour / Favourite ARMY ticket), a seven-card polaroid memory board, passport-style travel stamps, and an animated sunset film strip with music-wave detail. The section reveals after the gift is opened and when scrolled into view. Pre-edit checkpoint: `backup-before-dreamboard-v46-20260917`.

- v47: upgraded the v46 future-dream scrapbook to look like physical keepsakes. Concert tickets now have fibrous paper texture, perforation-style cutouts, serial/gate/row details, folded corners and printed barcode strips; snapshots use taped instant-photo framing, film grain, time/date marks and stronger depth; added two mailed-postcard-style future travel cards with postage stamps, postmarks, address lines and worn paper; passport stamps and sunset film strip received more distressed, printed and photographic styling. Gift envelope and Khat lyric timeline remain unchanged. Pre-edit checkpoint: `backup-before-realistic-dreamboard-v47-20260917`.

- v48: converted the entire future-dream scrapbook into a hidden tap-to-reveal 3D keepsake experience below the gift envelope. Before tapping, only a closed aged-paper keepsake cover is shown; tapping it opens the cover in perspective and unfolds the full panel. Tickets, polaroids, postcards, passport stamps and the sunset film strip now animate into place with stronger perspective depth, layered shadows, lifted paper edges and desktop hover depth. Existing v47 realism details remain underneath the new 3D layer. Gift envelope and Khat lyric timeline remain unchanged. Pre-edit checkpoint: `backup-before-3d-reveal-v48-20260917`.

- v49: upgraded the v48 keepsake cover to a true tap-to-open / tap-to-close toggle. Added smoother reversible 3D transitions, a softer folding close animation, dynamic open/close labels, a wax-seal lift, subtle sparkle/glow burst on opening, and gentler object-settle animations when reopening. The gift envelope, dreamboard content and Khat timeline remain unchanged. Pre-edit checkpoint: `backup-before-magical-toggle-v49-20260917`.

- v50: added a completely free, no-external-platform browser-local analytics layer. The site now stores anonymous same-browser events for site opens, button clicks, password success/failure counts, scroll depth, gift/dreamboard opens and closes, section enter/exit dwell time, visibility changes, session duration, device/screen/referrer/share-tag metadata. Added `admin-analytics.html`, which auto-refreshes every second, summarizes counts and dwell time, shows a local event timeline, and supports JSON export/clear. Because GitHub Pages has no database, this version cannot aggregate analytics from other visitors' devices. No actual password text, phone number, or hidden personal identity is stored. Pre-edit checkpoint: `backup-before-local-analytics-v50-20260917`.
