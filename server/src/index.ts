import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./auth/passport.js";
import { ENV } from "./env.js";
import authRoutes from "./routes/auth.js";
import analyzeRoutes from "./routes/analyze.js";
import runsRoutes from "./routes/runs.js";
import subscriptionRoutes from "./routes/subscription.js";

const app = express();

app.use(cors({ origin: ENV.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Session configuration for OAuth
app.use(session({
  secret: ENV.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/health", (_, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/runs", runsRoutes);
app.use("/api/subscription", subscriptionRoutes);

app.listen(ENV.PORT, () => {
  console.log(`[panda] server listening on :${ENV.PORT}`);
  console.log(`[panda] OAuth callbacks will be at ${ENV.SERVER_URL}/api/auth/`);
});
