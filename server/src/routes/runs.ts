import { Router } from "express";
import { requireAuth } from "../auth/middleware.js";
import { getRun, listRuns } from "../repos/runsRepo.js";

const r = Router();

r.get("/", requireAuth, (req, res) => {
  const { uid } = (req as any).claims;
  const rows = listRuns(uid);
  res.json(rows);
});

r.get("/:id", requireAuth, (req, res) => {
  const { id } = req.params;
  const data = getRun(id);
  if (!data.run) return res.status(404).send("Not found");
  res.json(data);
});

export default r;
