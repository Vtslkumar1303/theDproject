# Website versions

Each update is saved in Git history. Cache-busting URL parameters refresh assets; they do not select an old version.

- v39 (before refinements): f71f79ad1bc2ec10d86e36af27bb17ab794fd606, preserved at branch `rollback/v39-before-refinements`.
- v40: French-cut beard, 30% Web Audio volume, Khat - by an atheist title, icon playback button, no playlist label, clearer envelope note, failed-password hints, transform-based page expansion. Preserved at `rollback/v40-refinements` after publishing.

For rollback, restore the selected version's tree in a new commit on main, preserving later history and refreshing the asset version token. Earlier revisions remain in Git history.
