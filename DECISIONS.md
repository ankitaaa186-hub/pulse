# DECISIONS.md

- **Next.js 14 App Router single app**: one deployable, API routes co-located. Faster demo than split FE/BE.
- **Drizzle portable schema, text UUIDs**: same table defs compile to sqlite + pg. Avoids serial/int mismatch.
- **node:sqlite (Node 22 built-in) locally, postgres-js on Supabase**: zero native modules (no better-sqlite3 build pain on Windows/Vercel), pure-JS pg driver.
- **Demo JSON + file seed for P0**: unblocks UI without DB migrations; real writes in P1.
- **Single shared password (APP_PASSWORD cookie), not Supabase Auth**: matches "common password" ask, zero friction for demo, stays server-side. Upgrade to Auth in P4 if multi-user needed.
- **Supabase CLI + Vercel CLI first**: reproducible envs, `supabase start` parity, `vercel --prod` deploys. Render reserved for long workers if Hobby timeout bites.
- **Fallback free-model list hardcoded + live /models fetch**: free models churn; never hardcode one.
- **No shadcn CLI in P0**: hand-rolled Tailwind tokens + cn() to avoid generator churn; add shadcn components incrementally in P2.
