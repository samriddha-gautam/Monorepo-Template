import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

const url = process.env.DIRECT_URL;

if (!url) {
  throw new Error("DIRECT_URL environment variable is required");
}

const baseDir = existsSync("./packages/db") ? "./packages/db" : ".";
export default defineConfig({
  dialect: "postgresql",
  schema: `${baseDir}/src/schema.ts`,
  out: `${baseDir}/drizzle`,
  dbCredentials: {
    url,
  },
});
