"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Search, Copy, Check, ExternalLink, Mail, Sparkles } from "lucide-react";
import { DEMO_COMPANIES, DEMO_INSIGHTS } from "@/db/demo-data";
import { cn } from "@/lib/utils";

function ScoreRing({ v }: { v: number }) {
  const c = v >= 80 ? "text-emerald-600" : v >= 65 ? "text-amber-600" : "text-slate-500";
  return <span className={cn("inline-flex size-11 items-center justify-center rounded-full border-2 font-bold", c)} aria-label={`score ${v}`}>{v}</span>;
}

export default function Dashboard() {
  const [q, setQ] = useState("");
  const [company, setCompany] = useState("all");
  const [copied, setCopied] = useState<string | null>(null);

  const insights = useMemo(() => DEMO_INSIGHTS
    .filter((i) => (company === "all" || i.companyId === company))
    .filter((i) => !q || (i.headline + i.what).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => b.score - a.score), [q, company]);

  function copy(id: string, body: string) {
    navigator.clipboard.writeText(body);
    setCopied(id); setTimeout(() => setCopied(null), 1500);
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground"><Activity /></span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pulse</h1>
            <p className="text-sm text-muted-foreground">Demo Mode — no key needed · {DEMO_INSIGHTS.length} insights across {DEMO_COMPANIES.length} companies</p>
          </div>
        </div>
        <nav className="flex gap-2 text-sm">
          <a className="rounded-lg border px-3 py-1.5" href="/onboarding">Onboarding</a>
          <a className="rounded-lg border px-3 py-1.5" href="/brief">Brief</a>
          <a className="rounded-lg border px-3 py-1.5" href="/settings">Settings</a>
        </nav>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-3" aria-label="companies">
        {DEMO_COMPANIES.map((c) => {
          const n = DEMO_INSIGHTS.filter((i) => i.companyId === c.id).length;
          const top = Math.max(...DEMO_INSIGHTS.filter((i) => i.companyId === c.id).map((i) => i.score));
          return (
            <a key={c.id} href={`/company/${c.id}`} className="rounded-2xl border bg-card p-4 transition hover:shadow-md">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=64`} alt="" width={32} height={32} className="rounded-md" />
                <div><h2 className="font-semibold">{c.name}</h2><p className="text-xs text-muted-foreground">{c.kind} · {n} insights</p></div>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-700"><span className="size-2 animate-pulse rounded-full bg-emerald-500" />{top}</span>
              </div>
            </a>
          );
        })}
      </section>

      <section className="mt-6 flex flex-wrap gap-2">
        <label className="flex flex-1 items-center gap-2 rounded-xl border bg-card px-3 py-2">
          <Search size={16} className="text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search insights… (⌘K soon)" className="w-full bg-transparent outline-none" aria-label="search insights" />
        </label>
        <select value={company} onChange={(e) => setCompany(e.target.value)} className="rounded-xl border bg-card px-3 py-2" aria-label="filter company">
          <option value="all">All companies</option>
          {DEMO_COMPANIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </section>

      <section className="mt-4 grid gap-4" aria-label="insight feed">
        {insights.map((ins, idx) => {
          const co = DEMO_COMPANIES.find((c) => c.id === ins.companyId);
          return (
            <motion.article key={ins.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.05, 0.3) }} className="rounded-2xl border bg-card p-5">
              <div className="flex items-start gap-4">
                <ScoreRing v={ins.score} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{ins.type.replaceAll("_", " ")}</span>
                    <span className="text-xs text-muted-foreground">{co?.name} · {ins.confidence} confidence</span>
                  </div>
                  <h2 className="mt-1 text-lg font-semibold leading-snug">{ins.headline}</h2>
                  <p className="mt-1 text-sm"><strong>What happened:</strong> {ins.what}</p>
                  <p className="mt-1 text-sm"><strong>Why it matters to you:</strong> {ins.whyItMatters}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {ins.evidence.map((e) => (
                      <a key={e.url + e.title} href={e.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs hover:bg-accent">{e.source} <ExternalLink size={12} /></a>
                    ))}
                  </div>
                  <details className="mt-2 text-xs text-muted-foreground">
                    <summary className="cursor-pointer font-medium">Why this score ({ins.score})</summary>
                    <pre className="mt-1 overflow-auto rounded-lg bg-muted p-2">{JSON.stringify(ins.scoreBreakdown, null, 2)}</pre>
                  </details>
                  <div className="mt-3 rounded-xl border bg-muted/40 p-3 text-sm">
                    <p className="font-semibold flex items-center gap-1"><Sparkles size={14} /> Suggested contact</p>
                    <p>{ins.contact.name ?? ins.contact.title} {ins.contact.name ? `· ${ins.contact.title}` : ""}</p>
                    <p className="text-xs text-muted-foreground">{ins.contact.source === "verified_from_source" ? "✓ verified from source" : "role suggestion"} · {ins.contact.confidence} · {ins.contact.roleReason}</p>
                    <a href={ins.contact.linkedinSearchUrl} target="_blank" rel="noreferrer" className="text-xs underline">LinkedIn people search</a>
                  </div>
                  <div className="mt-2 rounded-xl border p-3">
                    <p className="text-sm font-semibold">Subject: {ins.draft.subject}</p>
                    <p className="whitespace-pre-wrap text-sm text-muted-foreground">{ins.draft.body}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">AI-generated. Verify before sending.</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button onClick={() => copy(ins.id, `Subject: ${ins.draft.subject}\n\n${ins.draft.body}`)} className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground">
                      {copied === ins.id ? <Check size={14} /> : <Copy size={14} />} {copied === ins.id ? "Copied" : "Copy email"}
                    </button>
                    <a href={`mailto:?subject=${encodeURIComponent(ins.draft.subject)}&body=${encodeURIComponent(ins.draft.body)}`} className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm"><Mail size={14} /> Open in mail app</a>
                    <a href={`/company/${ins.companyId}`} className="rounded-lg border px-3 py-1.5 text-sm">Company timeline</a>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
        {insights.length === 0 && (
          <div className="rounded-2xl border border-dashed p-10 text-center">
            <p className="font-semibold">No insights match</p>
            <p className="text-sm text-muted-foreground">Clear filters or run onboarding to add a company.</p>
          </div>
        )}
      </section>
      <footer className="mt-10 text-xs text-muted-foreground">
        <p>Responsible use: public sources only, no LinkedIn scraping, verify drafts before sending. Sources & confidence shown per insight.</p>
      </footer>
    </main>
  );
}
