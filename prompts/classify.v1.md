# classify v1 — rules the model must follow (Phase 1 wiring).
- Use ONLY the provided evidence. Never use outside knowledge.
- Output JSON only matching the zod schema.
- If unsure, label `noise` with low confidence.
- Drop anything that cannot cite a source URL.
