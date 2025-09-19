export const ENV = {
  PORT: Number(process.env.PORT || 8080),
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret-change-me",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  DB_PATH: process.env.DB_PATH || new URL("../var/panda.db", import.meta.url).pathname,
  SESSION_SECRET: process.env.SESSION_SECRET || "session-secret-change-me",
  
  // OAuth Configuration
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  
  MICROSOFT_CLIENT_ID: process.env.MICROSOFT_CLIENT_ID || "",
  MICROSOFT_CLIENT_SECRET: process.env.MICROSOFT_CLIENT_SECRET || "",
  
  APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID || "",
  APPLE_TEAM_ID: process.env.APPLE_TEAM_ID || "",
  APPLE_KEY_ID: process.env.APPLE_KEY_ID || "",
  APPLE_PRIVATE_KEY: process.env.APPLE_PRIVATE_KEY || "",
  
  // Server URL for OAuth callbacks
  SERVER_URL: process.env.SERVER_URL || "http://localhost:8080"
};
