export const SIGNAL_TYPES = [
  "leadership_change", "funding", "m_and_a", "expansion_new_market",
  "product_launch", "hiring_surge", "layoffs_restructuring",
  "earnings_strategy_shift", "regulatory_compliance", "tech_stack_change",
  "partnership", "negative_press", "noise",
] as const;

export type SignalType = (typeof SIGNAL_TYPES)[number];

const KEYWORDS: Record<string, SignalType> = {
  "raises": "funding", "seed": "funding", "series": "funding",
  "acquires": "m_and_a", "merger": "m_and_a",
  "launches": "product_launch", "launch": "product_launch",
  "hiring": "hiring_surge", "layoff": "layoffs_restructuring",
  "earnings": "earnings_strategy_shift", "10-k": "earnings_strategy_shift",
  "partnership": "partnership", "ceo": "leadership_change",
};

export function classifyHeuristic(title: string): SignalType {
  const t = title.toLowerCase();
  for (const [k, v] of Object.entries(KEYWORDS)) if (t.includes(k)) return v;
  return "noise";
}
