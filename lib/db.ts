import { env } from "@/lib/env";

// Phase 0: Demo Mode reads from baked JSON, no DB round-trip required.
// Phase 1+: sqlite via node:sqlite locally, postgres-js via Supabase in prod.

export type DbDriver = "demo" | "sqlite" | "postgres";

export function getDriver(): DbDriver {
  if (!env.DATABASE_URL && env.DB_DRIVER === "postgres") return "demo";
  return env.DB_DRIVER === "postgres" ? "postgres" : "sqlite";
}

export async function getDb() {
  const driver = getDriver();
  if (driver === "postgres") {
    const { drizzle } = await import("drizzle-orm/postgres-js");
    const postgres = (await import("postgres")).default;
    const client = postgres(process.env.DATABASE_URL as string, { prepare: false });
    return { driver, db: drizzle(client) };
  }
  // Phase 0: Demo Mode needs no live SQLite connection.
  // Phase 1 wires node:sqlite (Node 22 built-in) + drizzle-orm/node-sqlite
  // after upgrading drizzle. Dashboard reads from db/demo-data.ts until then.
  throw new Error("SQLite live connection lands in Phase 1 — use Demo Mode data for now.");
}
