export const ENV = {
  PORT: Number(process.env.PORT || 8080),
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret-change-me",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  DB_PATH: process.env.DB_PATH || new URL("../var/panda.db", import.meta.url).pathname
};
