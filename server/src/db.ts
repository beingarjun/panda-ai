import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ENV } from "./env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFile = ENV.DB_PATH;

const db = new Database(dbFile);
db.pragma("journal_mode = WAL");

const schemaPath = path.join(__dirname, "schema.sql");
const ddl = fs.readFileSync(schemaPath, "utf-8");
db.exec(ddl);

export default db;
