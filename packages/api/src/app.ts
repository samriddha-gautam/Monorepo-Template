import { Hono } from "hono";
import { requireUser, type AppEnv } from "./auth";

export const app = new Hono<AppEnv>().basePath("/api");

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.get("/me", requireUser, (c) => {
  const user = c.get("user");
  return c.json({ id: user.id });
});

app.notFound((c) => {
  return c.json({ error: "not_found" }, 404);
});

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "internal_error" }, 500);
});
