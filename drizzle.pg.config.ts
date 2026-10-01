import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./db/pg/migrations",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "" },
} satisfies Config;
