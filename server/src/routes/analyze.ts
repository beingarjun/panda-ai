import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../auth/middleware.js";
import { runAgent } from "../agent/agent.js";
import { v4 as uuidv4 } from "uuid";
import { createRun, insertCompetitors, insertEngineResults } from "../repos/runsRepo.js";

const r = Router();

const AnalyzeDTO = z.object({
  website: z.string().default(""),
  description: z.string().default(""),
  topicsCsv: z.string().default(""),
  promptsText: z.string().default("")
});

r.post("/", requireAuth, async (req, res) => {
  const parse = AnalyzeDTO.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error.flatten());
  const payload = parse.data;

  const out = await runAgent(payload);
  const runId = uuidv4();
  const { uid } = (req as any).claims;

  createRun(runId, uid, payload);
  insertCompetitors(runId, out.competitors);
  insertEngineResults(runId, out.engineResults);

  res.json({ runId, ...out });
});

export default r;
