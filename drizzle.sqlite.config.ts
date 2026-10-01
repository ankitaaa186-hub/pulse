import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./db/sqlite/migrations",
  dialect: "sqlite",
  dbCredentials: { url: "./data/pulse.db" },
} satisfies Config;
