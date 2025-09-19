import db from "../db.js";
import { RankedCompetitor } from "../types.js";

export function createRun(runId: string, userId: number, payload: {
  website: string; description: string; topicsCsv: string; promptsText: string;
}) {
  db.prepare(
    "INSERT INTO runs (id, user_id, website, description, topics_csv, prompts_text, created_at) VALUES (?,?,?,?,?,?,?)"
  ).run(runId, userId, payload.website, payload.description, payload.topicsCsv, payload.promptsText, Date.now());
}

export function insertCompetitors(runId: string, list: RankedCompetitor[]) {
  const st = db.prepare(
    "INSERT INTO competitors (run_id, name, score, topical, schema, freshness) VALUES (?,?,?,?,?,?)"
  );
  const tx = db.transaction((rows: RankedCompetitor[]) => {
    for (const c of rows) st.run(runId, c.name, c.score, c.topical, c.schema, c.freshness);
  });
  tx(list);
}

export function insertEngineResults(runId: string, engines: { engine: string; score: number; sources: {title: string; url: string}[] }[]) {
  const stRes = db.prepare(
    "INSERT INTO engine_results (run_id, engine, score) VALUES (?,?,?)"
  );
  const stSrc = db.prepare(
    "INSERT INTO engine_sources (engine_result_id, title, url) VALUES (?,?,?)"
  );
  const tx = db.transaction(() => {
    for (const e of engines) {
      const info = stRes.run(runId, e.engine, e.score);
      const engineResultId = Number(info.lastInsertRowid);
      for (const s of e.sources) stSrc.run(engineResultId, s.title, s.url);
    }
  });
  tx();
}

export function listRuns(userId: number) {
  return db.prepare("SELECT * FROM runs WHERE user_id = ? ORDER BY created_at DESC").all(userId);
}

export function getRun(runId: string) {
  const run = db.prepare("SELECT * FROM runs WHERE id = ?").get(runId);
  const competitors = db.prepare("SELECT name, score, topical, schema, freshness FROM competitors WHERE run_id = ? ORDER BY score DESC").all(runId);
  const engines = db.prepare("SELECT id, engine, score FROM engine_results WHERE run_id = ?").all(runId) as any[];
  for (const e of engines) {
    e.sources = db.prepare("SELECT title, url FROM engine_sources WHERE engine_result_id = ?").all(e.id);
    delete e.id;
  }
  return { run, competitors, engines };
}
