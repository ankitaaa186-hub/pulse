import type { Connector } from "./types";
// Phase 1 will implement RSS parsing. Phase 0 stub keeps interface stable.
export const newsConnector: Connector = {
  id: "news-rss",
  async fetchSignals() { return []; },
};
