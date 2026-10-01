import { DEMO_COMPANIES, DEMO_INSIGHTS } from "@/db/demo-data";

export default function CompanyPage({ params }: { params: { id: string } }) {
  const co = DEMO_COMPANIES.find((c) => c.id === params.id);
  if (!co) return <main className="p-6">Company not found. <a href="/" className="underline">Back</a></main>;
  const items = DEMO_INSIGHTS.filter((i) => i.companyId === co.id).sort((a, b) => b.createdAt - a.createdAt);
  return (
    <main className="mx-auto max-w-3xl p-6">
      <a href="/" className="text-sm underline">← Dashboard</a>
      <h1 className="mt-2 text-2xl font-bold">{co.name}</h1>
      <p className="text-sm text-muted-foreground">{co.domain} · {co.kind}</p>
      <div className="mt-4 rounded-2xl border bg-card p-4">
        <h2 className="font-semibold">Source health (demo)</h2>
        <ul className="mt-2 text-sm text-muted-foreground">
          <li>news-rss: ok · sec-edgar: {co.ticker ? "ok" : "n/a (private)"} · hiring: ok · tech: ok</li>
        </ul>
      </div>
      <ol className="mt-6 grid gap-4">
        {items.map((i) => (
          <li key={i.id} className="rounded-2xl border bg-card p-4">
            <p className="text-xs text-muted-foreground">{new Date(i.createdAt).toLocaleDateString()} · {i.type} · {i.score}</p>
            <p className="font-semibold">{i.headline}</p>
            <p className="text-sm">{i.what}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6 rounded-2xl border p-4">
        <h2 className="font-semibold">Ask about this company (Phase 4)</h2>
        <p className="text-sm text-muted-foreground">Grounded chat over stored evidence lands in Phase 4.</p>
      </div>
    </main>
  );
}
