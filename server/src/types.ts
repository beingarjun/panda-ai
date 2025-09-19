export type RankedCompetitor = {
  name: string; score: number; topical: number; schema: number; freshness: number;
};

export type EngineResult = {
  engine: string; score: number;
  sources: { title: string; url: string }[];
  issues: string[];
  suggestions: string[];
};

export type AnalyzeInput = {
  website: string;
  description: string;
  topicsCsv: string;
  promptsText: string;
};
