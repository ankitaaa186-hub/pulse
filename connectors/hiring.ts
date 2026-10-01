import type { Connector } from "./types";
export const hiringConnector: Connector = {
  id: "hiring",
  async fetchSignals() { return []; },
};
