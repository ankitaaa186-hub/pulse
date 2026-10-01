export interface ScoreBreakdown { recency: number; typeWeight: number; credibility: number; corroboration: number; fit: number; }

export const TYPE_WEIGHTS: Record<string, number> = {
  funding: 24, m_and_a: 24, product_launch: 22, expansion_new_market: 20,
  leadership_change: 18, hiring_surge: 16, earnings_strategy_shift: 18,
  layoffs_restructuring: 16, partnership: 14, regulatory_compliance: 14,
  tech_stack_change: 12, negative_press: 12, noise: 0,
};

export function scoreRecency(publishedAt: number, now = Date.now()): number {
  const days = Math.max(0, (now - publishedAt) / 86400000);
  if (days <= 1) return 30; if (days <= 3) return 26; if (days <= 7) return 22;
  if (days <= 30) return 14; return 6;
}

export function scoreSignal(opts: { type: string; publishedAt: number; credibility: number; corroboration: number; fit: number; now?: number }): { total: number; breakdown: ScoreBreakdown } {
  const recency = scoreRecency(opts.publishedAt, opts.now);
  const typeWeight = TYPE_WEIGHTS[opts.type] ?? 8;
  const breakdown = { recency, typeWeight, credibility: opts.credibility, corroboration: opts.corroboration, fit: opts.fit };
  const total = Math.min(100, Math.max(0, recency + typeWeight + opts.credibility + opts.corroboration + opts.fit));
  return { total, breakdown };
}
