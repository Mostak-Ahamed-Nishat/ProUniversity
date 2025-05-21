"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
function getEnvVar(name, required = true) {
    const value = process.env[name];
    if (required && (!value || value.trim() === "")) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
const config = {
    PORT: Number(getEnvVar("PORT")),
    DATABASE_URL: getEnvVar("DATABASE_URL"),
    NODE_ENV: getEnvVar("NODE_ENV", false) || "development",
};
exports.default = config;
