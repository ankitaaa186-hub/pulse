export default function Settings() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">Settings / BYOK</h1>
      <p className="mt-2 text-sm text-muted-foreground">Paste OpenRouter key — stored server-side only (settings table / env). Never logged or sent to browser after saving. Full BYOK wiring in Phase 2.</p>
      <div className="mt-4 rounded-2xl border bg-card p-4">
        <label htmlFor="k" className="text-sm font-medium">OpenRouter API key</label>
        <input id="k" type="password" placeholder="sk-or-v1-…" className="mt-1 w-full rounded-lg border bg-background px-3 py-2" />
        <p className="mt-2 text-xs text-muted-foreground">Default free models end in :free. Fallback chain in config/models.ts. <a className="underline" href="https://openrouter.ai/keys" target="_blank" rel="noreferrer">Get a free key</a>.</p>
      </div>
      <a href="/" className="mt-4 inline-block rounded-lg border px-4 py-2 text-sm">Back</a>
    </main>
  );
}
