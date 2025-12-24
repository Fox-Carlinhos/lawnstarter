import { config } from "dotenv";

config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3001", 10),
  HOST: process.env.HOST || "0.0.0.0",

  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/swstarter",

  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: parseInt(process.env.REDIS_PORT || "6379", 10),

  SWAPI_BASE_URL: process.env.SWAPI_BASE_URL || "https://www.swapi.tech/api",

  STATS_CRON_INTERVAL: parseInt(
    process.env.STATS_CRON_INTERVAL || "300000",
    10
  ),
} as const;
