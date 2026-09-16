# Prompt checkpoints

Each completed change request receives a permanent checkpoint branch. Version numbers refer to completed prompt states, not individual polishing commits.

| Version | Prompt state | Commit | Checkpoint branch |
| --- | --- | --- | --- |
| v21 | Standalone video and custom symbols | `6552b27f03f141bf71e733a8a6e5eb4a28b2a589` | `checkpoints/prompt-v21-standalone-video` |
| v23 | March subtitle, visible photo corners, full-screen reveal | `f1244aff0fa8f38edd6b69eb0a37f6fb7c33004e` | `checkpoints/prompt-v23-full-page-reveal` |
| v25 | Hidden photos, confession-only subtitle, threaded envelopes | `b764e8af5e4c2f2b397b0d96e8c1e241b4b1e12f` | `checkpoints/prompt-v25-threaded-envelopes` |
| v26 | Separate Open/Close gift buttons and native 🧿 | Branch resolves to final commit | `checkpoints/prompt-v26-open-close-native-eye` |

Say “rollback to v25”, “rollback one prompt”, or describe the earlier prompt. Clarify ambiguous descriptions. Restore the selected checkpoint as a new commit on main, preserve later checkpoints, and refresh asset cache keys. Never force-push or erase history. A rollback can also be limited to a specified feature.

Checkpoints preserve repository source, not externally hosted media. Changes to external media files cannot be recovered through Git alone.
