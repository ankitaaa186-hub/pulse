 "use client";
import { DEMO_INSIGHTS } from "@/db/demo-data";

export default function Brief() {
  return (
    <main className="mx-auto max-w-3xl p-6 print:max-w-none">
      <h1 className="text-2xl font-bold">Weekly brief (printable)</h1>
      <p className="text-sm text-muted-foreground">Phase 0 static render from demo data. Export/CSV + email digest in Phase 4.</p>
      <div className="mt-4 grid gap-3">
        {[...DEMO_INSIGHTS].sort((a, b) => b.score - a.score).map((i) => (
          <article key={i.id} className="rounded-xl border p-3">
            <p className="font-semibold">{i.headline} ({i.score})</p>
            <p className="text-sm">{i.whyItMatters}</p>
          </article>
        ))}
      </div>
      <button onClick={() => print()} className="mt-4 rounded-lg border px-3 py-1.5 text-sm">Print</button>
    </main>
  );
}
