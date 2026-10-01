export async function fetchWithTimeout(url: string, ms = 8000, init: RequestInit = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal, headers: { "User-Agent": "Pulse/0.1 (CSM intelligence demo; contact: hello@example.com)", ...(init.headers ?? {}) } });
  } finally { clearTimeout(t); }
}

export async function fetchWithRetry(url: string, tries = 2, ms = 8000) {
  let last: unknown;
  for (let i = 0; i < tries; i++) {
    try { const r = await fetchWithTimeout(url, ms); if (r.ok) return r; last = new Error(`HTTP ${r.status}`); }
    catch (e) { last = e; await new Promise((r) => setTimeout(r, 400 * (i + 1))); }
  }
  throw last;
}
