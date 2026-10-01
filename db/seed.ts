import { DEMO_COMPANIES, DEMO_INSIGHTS } from "./demo-data";

async function main() {
  // Phase 0: seed is idempotent and file-based. Real DB writes land in Phase 1.
  // We validate demo data integrity (every insight has evidence) and write data/pulse.json.
  const fs = await import("node:fs/promises");
  for (const ins of DEMO_INSIGHTS) {
    if (!ins.evidence || ins.evidence.length === 0) throw new Error(`Insight ${ins.id} missing evidence`);
  }
  await fs.mkdir("./data", { recursive: true });
  await fs.writeFile("./data/pulse.json", JSON.stringify({ companies: DEMO_COMPANIES, insights: DEMO_INSIGHTS }, null, 2));
  console.log(`Seeded ${DEMO_COMPANIES.length} companies, ${DEMO_INSIGHTS.length} insights -> ./data/pulse.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });
