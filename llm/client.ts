import { FALLBACK_FREE_MODELS } from "@/config/models";

// Central LLM client stub for Phase 0. Phase 1 wires OpenRouter + fallback/backoff.
export async function listFreeModels(apiKey?: string): Promise<string[]> {
  if (!apiKey) return FALLBACK_FREE_MODELS;
  try {
    const r = await fetch("https://openrouter.ai/api/v1/models", { headers: { Authorization: `Bearer ${apiKey}` } });
    if (!r.ok) return FALLBACK_FREE_MODELS;
    const j = await r.json();
    const free = (j?.data ?? []).filter((m: { pricing?: { prompt?: string } }) => m?.pricing?.prompt === "0").map((m: { id: string }) => m.id);
    return free.length ? free : FALLBACK_FREE_MODELS;
  } catch { return FALLBACK_FREE_MODELS; }
}
