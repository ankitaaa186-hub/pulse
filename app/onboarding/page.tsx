export default function Onboarding() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">Onboarding (Phase 0 preview)</h1>
      <ol className="mt-4 grid gap-4">
        <li className="rounded-2xl border bg-card p-4"><strong>1. What do you sell?</strong><p className="text-sm text-muted-foreground">Product, value prop, tone, signature — saved to user_profile in Phase 2.</p></li>
        <li className="rounded-2xl border bg-card p-4"><strong>2. Add companies</strong><p className="text-sm text-muted-foreground">Autocomplete + favicon logos. Demo ships with Microsoft, Starbucks, Acme Robotics.</p></li>
        <li className="rounded-2xl border bg-card p-4"><strong>3. Key or Demo</strong><p className="text-sm text-muted-foreground">Paste OpenRouter key in Settings or continue in Demo Mode. <a className="underline" href="https://openrouter.ai/keys" target="_blank" rel="noreferrer">Get a free key in 60s</a>.</p></li>
      </ol>
      <a href="/" className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Back to dashboard</a>
    </main>
  );
}
