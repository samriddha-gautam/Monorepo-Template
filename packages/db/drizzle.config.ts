import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

const url = process.env.DIRECT_URL;

if (!url) {
  throw new Error("DIRECT_URL environment variable is required");
}

const isMonorepoRoot = existsSync("./packages/db");

export default defineConfig({
  dialect: "postgresql",
  schema: isMonorepoRoot ? "./packages/db/src/schema.ts" : "./src/schema.ts",
  out: isMonorepoRoot ? "./packages/db/drizzle" : "./drizzle",
  dbCredentials: {
    url,
  },
});
