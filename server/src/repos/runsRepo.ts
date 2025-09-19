import db from "../db.js";
import { RankedCompetitor } from "../types.js";

export function createRun(runId: string, userId: number, payload: {
  website: string; description: string; topicsCsv: string; promptsText: string;
}) {
  db.createRun(runId, userId, {
    website: payload.website,
    description: payload.description,
    topics_csv: payload.topicsCsv,
    prompts_text: payload.promptsText
  });
}

export function insertCompetitors(runId: string, list: RankedCompetitor[]) {
  db.insertCompetitors(runId, list);
}

export function insertEngineResults(runId: string, engines: { engine: string; score: number; sources: {title: string; url: string}[] }[]) {
  db.insertEngineResults(runId, engines);
}

export function listRuns(userId: number) {
  return db.listRuns(userId);
}

export function getRun(runId: string) {
  return db.getRun(runId);
}
