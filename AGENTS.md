# Project rollback rules

- The user requires rollback to previous completed prompt versions.
- Before editing, preserve the published main commit in a named checkpoint branch if not already checkpointed.
- After each completed prompt, preserve the final published commit in a new checkpoint branch and append its prompt summary to VERSION_HISTORY.md.
- Never move or overwrite existing checkpoint branches.
- Roll back through a new restore commit on main, preserving later checkpoints; never reset or force-push main. Refresh asset cache keys after restoring.
- Preserve unrelated worktree changes and upload only task-related files.
