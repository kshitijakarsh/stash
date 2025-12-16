import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { UserTable } from "./User";

export const UserLinksTable = pgTable("user_links", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),

  url: text("url").notNull(),
  label: text("label"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
