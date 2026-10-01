import { z } from "zod";

export const InsightSchema = z.object({
  type: z.string(),
  headline: z.string().min(8),
  what: z.string().min(10),
  whyItMatters: z.string().min(10),
  action: z.string().min(5),
  confidence: z.enum(["low", "medium", "high"]),
  evidenceIndexes: z.array(z.number().int().nonnegative()).min(1),
});

export function repairJson(raw: string): unknown {
  let s = raw.trim();
  const fenced = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) s = fenced[1].trim();
  const start = s.search(/[{[]/);
  const end = Math.max(s.lastIndexOf("}"), s.lastIndexOf("]"));
  if (start >= 0 && end > start) s = s.slice(start, end + 1);
  s = s.replace(/,\s*([}\]])/g, "$1");
  return JSON.parse(s);
}
