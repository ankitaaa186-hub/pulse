"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity } from "lucide-react";

export default function LoginPage() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const r = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    if (r.ok) router.push("/");
    else setErr("Wrong password. Default from .env.example is pulse-demo-1234.");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 p-6">
      <div className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Activity size={20} /></span>
        <div><h1 className="text-xl font-bold">Pulse</h1><p className="text-sm text-muted-foreground">Single-user gate — shared password</p></div>
      </div>
      <form onSubmit={submit} className="grid gap-3 rounded-2xl border bg-card p-5">
        <label htmlFor="pw" className="text-sm font-medium">Common password</label>
        <input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="rounded-lg border bg-background px-3 py-2" placeholder="pulse-demo-1234" autoFocus />
        {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
        <button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Unlock</button>
        <p className="text-xs text-muted-foreground">Set APP_PASSWORD in .env / Vercel env. Supabase + Vercel CLI deploy keeps the same gate.</p>
      </form>
    </main>
  );
}
