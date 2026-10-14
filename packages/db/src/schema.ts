import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["draft", "published"]);

export const examples = pgTable("examples", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  status: statusEnum("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
