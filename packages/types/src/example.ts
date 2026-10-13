import { z } from "zod";

export const createExampleSchema = z.object({
  name: z.string().trim().min(1).max(100),
  description: z.string().trim().max(500).optional(),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type CreateExampleInput = z.infer<typeof createExampleSchema>;
