import { sql } from "drizzle-orm";
import { check, pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { posts } from "./posts";

export const ratings = pgTable(
  "ratings",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    check("ratings_rating_range", sql`"rating" >= 1 AND "rating" <= 10`),
  ],
);
