import type { Connector } from "./types";
export const techConnector: Connector = {
  id: "tech",
  async fetchSignals() { return []; },
};
