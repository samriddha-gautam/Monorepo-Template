import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export type AuthUser = {
  id: string;
};

export type AppEnv = {
  Variables: {
    user: AuthUser;
  };
};

// Seam for authentication: swap this function implementation for your auth provider
export async function verifyToken(token: string): Promise<AuthUser | null> {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required");
  }

  try {
    const payload = await verify(token, secret, "HS256");
    if (typeof payload.sub === "string" && payload.sub.length > 0) {
      return { id: payload.sub };
    }
    return null;
  } catch {
    return null;
  }
}

export const requireUser = createMiddleware<AppEnv>(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json({ error: "unauthorized" }, 401);
  }

  const [scheme, token, ...extra] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token || extra.length > 0) {
    return c.json({ error: "unauthorized" }, 401);
  }

  const user = await verifyToken(token);
  if (!user) {
    return c.json({ error: "unauthorized" }, 401);
  }

  c.set("user", user);
  await next();
});
