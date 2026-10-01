export interface RawSignal {
  source: string;
  url: string;
  title: string;
  body?: string;
  publishedAt?: number;
}

export interface Connector {
  id: string;
  fetchSignals(company: { name: string; domain?: string }, sinceDate: Date): Promise<RawSignal[]>;
}
