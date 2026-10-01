import { describe, it, expect } from "vitest";
import { canonicalUrl, titleSimilarity, hashSignal } from "../pipeline/dedupe";
import { scoreSignal } from "../pipeline/score";
import { repairJson, InsightSchema } from "../llm/schemas";

describe("dedupe", () => {
  it("canonicalizes urls", () => {
    expect(canonicalUrl("https://x.com/a?utm_source=1#frag")).toBe("https://x.com/a");
  });
  it("detects similar titles", () => {
    expect(titleSimilarity("Microsoft launches Copilot controls", "Microsoft launches Copilot control")).toBeGreaterThan(0.7);
    expect(titleSimilarity("apples", "quantum rockets mars")).toBeLessThan(0.3);
  });
  it("hashes stably", () => {
    expect(hashSignal("https://x.com/a", "Hi")).toBe(hashSignal("https://x.com/a?utm_source=1", "hi "));
  });
});

describe("score", () => {
  it("scores recent funding high", () => {
    const { total } = scoreSignal({ type: "funding", publishedAt: Date.now(), credibility: 16, corroboration: 10, fit: 10 });
    expect(total).toBeGreaterThan(75);
  });
});

describe("repair", () => {
  it("repairs fenced json", () => {
    const v = repairJson('```json\n{"type":"funding","headline":"Acme raises seed round today","what":"Acme raised a seed round to expand pilots.","whyItMatters":"Buying window for your product.","action":"Email CTO","confidence":"high","evidenceIndexes":[0],}\n```');
    expect(InsightSchema.parse(v).type).toBe("funding");
  });
});
