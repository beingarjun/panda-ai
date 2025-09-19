-- Users & Sessions
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

-- Trial Runs
CREATE TABLE IF NOT EXISTS runs (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  website TEXT,
  description TEXT,
  topics_csv TEXT,
  prompts_text TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Competitors (per run)
CREATE TABLE IF NOT EXISTS competitors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id TEXT NOT NULL,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  topical INTEGER NOT NULL,
  schema INTEGER NOT NULL,
  freshness INTEGER NOT NULL,
  FOREIGN KEY (run_id) REFERENCES runs(id)
);

-- Engine Results (per run)
CREATE TABLE IF NOT EXISTS engine_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id TEXT NOT NULL,
  engine TEXT NOT NULL,
  score INTEGER NOT NULL,
  FOREIGN KEY (run_id) REFERENCES runs(id)
);

-- Engine Sources (per engine_result)
CREATE TABLE IF NOT EXISTS engine_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  engine_result_id INTEGER NOT NULL,
  title TEXT,
  url TEXT,
  FOREIGN KEY (engine_result_id) REFERENCES engine_results(id)
);
