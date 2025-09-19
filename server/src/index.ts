import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./env.js";
import authRoutes from "./routes/auth.js";
import analyzeRoutes from "./routes/analyze.js";
import runsRoutes from "./routes/runs.js";

const app = express();

app.use(cors({ origin: ENV.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/runs", runsRoutes);

app.listen(ENV.PORT, () => {
  console.log(`[panda] server listening on :${ENV.PORT}`);
});
