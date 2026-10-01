import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Portable schema: column types chosen to map cleanly to Postgres.
// SQLite stores via node:sqlite locally; Supabase Postgres in prod.
// IDs are text UUIDs so both drivers behave identically.

export const userProfile = sqliteTable("user_profile", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  productDescription: text("product_description").notNull().default(""),
  valueProp: text("value_prop").notNull().default(""),
  tone: text("tone").notNull().default("concise"),
  signature: text("signature").notNull().default(""),
});

export const companies = sqliteTable("companies", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  domain: text("domain"),
  ticker: text("ticker"),
  cik: text("cik"),
  careersUrl: text("careers_url"),
  logoUrl: text("logo_url"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

export const signalsRaw = sqliteTable("signals_raw", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  companyId: text("company_id").references(() => companies.id),
  source: text("source").notNull(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  body: text("body"),
  publishedAt: integer("published_at"),
  hash: text("hash").notNull(),
});

export const insights = sqliteTable("insights", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  companyId: text("company_id").references(() => companies.id),
  type: text("type").notNull(),
  headline: text("headline").notNull(),
  what: text("what").notNull(),
  whyItMatters: text("why_it_matters").notNull(),
  action: text("action").notNull(),
  score: real("score").notNull().default(0),
  scoreBreakdown: text("score_breakdown"),
  confidence: text("confidence").notNull().default("medium"),
  status: text("status").notNull().default("new"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

export const insightEvidence = sqliteTable("insight_evidence", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  insightId: text("insight_id").references(() => insights.id),
  title: text("title").notNull(),
  source: text("source").notNull(),
  url: text("url").notNull(),
  publishedAt: integer("published_at"),
});

export const contacts = sqliteTable("contacts", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  insightId: text("insight_id").references(() => insights.id),
  companyId: text("company_id").references(() => companies.id),
  name: text("name"),
  title: text("title"),
  roleReason: text("role_reason"),
  source: text("source").notNull().default("role_suggestion"),
  confidence: text("confidence").notNull().default("low"),
  linkedinSearchUrl: text("linkedin_search_url"),
});

export const drafts = sqliteTable("drafts", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  insightId: text("insight_id").references(() => insights.id),
  tone: text("tone").notNull().default("concise"),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
});

export const feedback = sqliteTable("feedback", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  insightId: text("insight_id").references(() => insights.id),
  action: text("action").notNull(),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
});

export const runs = sqliteTable("runs", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  status: text("status").notNull().default("done"),
  startedAt: integer("started_at").$defaultFn(() => Date.now()),
  stats: text("stats"),
});

export const httpCache = sqliteTable("http_cache", {
  key: text("key").primaryKey(),
  url: text("url").notNull(),
  body: text("body").notNull(),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  ttlSeconds: integer("ttl_seconds").notNull().default(86400),
});

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});
