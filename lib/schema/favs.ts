import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const favs = pgTable("fav", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  rank: integer("rank").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
