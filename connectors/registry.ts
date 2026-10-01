import type { Connector } from "./types";
import { newsConnector } from "./news-rss";
import { secConnector } from "./sec-edgar";
import { hiringConnector } from "./hiring";
import { techConnector } from "./tech";

export const registry: Connector[] = [newsConnector, secConnector, hiringConnector, techConnector];
