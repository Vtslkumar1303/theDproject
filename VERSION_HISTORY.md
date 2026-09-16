# Prompt checkpoints

Each completed change request receives a permanent checkpoint branch. Version numbers refer to completed prompt states, not individual polishing commits.

| Version | Prompt state | Commit | Checkpoint branch |
| --- | --- | --- | --- |
| v21 | Standalone video and custom symbols | `6552b27f03f141bf71e733a8a6e5eb4a28b2a589` | `checkpoints/prompt-v21-standalone-video` |
| v23 | March subtitle, visible photo corners, full-screen reveal | `f1244aff0fa8f38edd6b69eb0a37f6fb7c33004e` | `checkpoints/prompt-v23-full-page-reveal` |
| v25 | Hidden photos, confession-only subtitle, threaded envelopes | `b764e8af5e4c2f2b397b0d96e8c1e241b4b1e12f` | `checkpoints/prompt-v25-threaded-envelopes` |
| v26 | Separate Open/Close gift buttons and native 🧿 | Branch resolves to final commit | `checkpoints/prompt-v26-open-close-native-eye` |
| v27 | Restore gift toggle; password-envelope tap/Close controls; hide password panel immediately after successful unlock | Branch resolves to final commit | `checkpoints/prompt-v27-password-envelope-controls` |
| v28 | Place confession-page nazar after March in responsive title flow, without overlapping letters | Branch resolves to final commit | `checkpoints/prompt-v28-nazar-after-march` |
| v29 | No date hints; letter hidden until unlock; thread-tap gift opening; crafted closing credit | Branch resolves to final commit | `checkpoints/prompt-v29-private-gate-thread-gift` |
| v30 | Move crafted credit to password-envelope cover, below seal near bottom; remove ending credit | Branch resolves to final commit | `checkpoints/prompt-v30-envelope-crafted-note` |
| v31 | Smaller single-line envelope credit; reference face artwork with black cat-eye/grey square glasses flanking video; no heart | Branch resolves to final commit | `checkpoints/prompt-v31-video-portrait-glasses` |
| v32 | Restore original video panel; smaller girl/boy faces outside panel in page background | Branch resolves to final commit | `checkpoints/prompt-v32-outside-video-faces` |

Say “rollback to v25”, “rollback one prompt”, or describe the earlier prompt. Clarify ambiguous descriptions. Restore the selected checkpoint as a new commit on main, preserve later checkpoints, and refresh asset cache keys. Never force-push or erase history. A rollback can also be limited to a specified feature.

Checkpoints preserve repository source, not externally hosted media. Changes to external media files cannot be recovered through Git alone.
