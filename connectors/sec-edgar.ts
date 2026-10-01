import type { Connector } from "./types";
export const secConnector: Connector = {
  id: "sec-edgar",
  async fetchSignals() { return []; },
};
