import type { CreateExampleInput } from "@app/types";
import { desc } from "drizzle-orm";
import { db } from "../client";
import { examples } from "../schema";

export const exampleRepo = {
  async list() {
    return await db.select().from(examples).orderBy(desc(examples.createdAt));
  },

  async create(input: CreateExampleInput) {
    const [created] = await db.insert(examples).values(input).returning();
    if (!created) {
      throw new Error("Failed to insert example");
    }
    return created;
  },
};
