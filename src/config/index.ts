import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

interface Config {
  PORT: number;
  DATABASE_URL: string;
  NODE_ENV: string;
}

function getEnvVar(name: string, required = true): string {
  const value = process.env[name];
  if (required && (!value || value.trim() === "")) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value as string;
}

const config: Config = {
  PORT: Number(getEnvVar("PORT")),
  DATABASE_URL: getEnvVar("DATABASE_URL"),
  NODE_ENV: getEnvVar("NODE_ENV", false) || "development",
};

export default config;
