import { app } from "./app";

function parsePort(value: string | undefined): number {
  if (value === undefined || value === "") {
    return 3001;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    throw new Error(`Invalid PORT environment variable: "${value}"`);
  }

  return parsed;
}

const port = parsePort(process.env.PORT);

export default {
  port,
  fetch: app.fetch,
};
