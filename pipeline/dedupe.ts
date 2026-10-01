import { createHash } from "node:crypto";

export function canonicalUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid"].forEach((p) => u.searchParams.delete(p));
    return u.toString().replace(/\/$/, "");
  } catch { return url.trim(); }
}

export function trigrams(s: string): Set<string> {
  const t = s.toLowerCase().replace(/\s+/g, " ").trim();
  const set = new Set<string>();
  for (let i = 0; i < t.length - 2; i++) set.add(t.slice(i, i + 3));
  return set;
}

export function titleSimilarity(a: string, b: string): number {
  const A = trigrams(a), B = trigrams(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const g of A) if (B.has(g)) inter++;
  return (2 * inter) / (A.size + B.size);
}

export function hashSignal(url: string, title: string): string {
  return createHash("sha256").update(canonicalUrl(url) + "|" + title.trim().toLowerCase()).digest("hex").slice(0, 16);
}
