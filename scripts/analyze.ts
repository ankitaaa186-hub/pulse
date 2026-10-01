import { DEMO_INSIGHTS } from "../db/demo-data";

// Phase 1 will run connectors + LLM. Phase 0 prints demo insights to prove shape.
async function main() {
  const name = process.argv.slice(2).join(" ") || "Microsoft";
  console.log(`Pulse analyze (demo) — ${name}\n`);
  const rows = DEMO_INSIGHTS.slice(0, 6);
  for (const r of rows) {
    console.log(`[${r.score}] ${r.headline} (${r.type})`);
    console.log(`  ${r.what}`);
    r.evidence.forEach((e) => console.log(`  - ${e.title}: ${e.url}`));
    console.log("");
  }
}
main();
