import { pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: uuid().primaryKey().defaultRandom(),
    email: text().notNull(),
    password: text().notNull(),
  },
  (table) => [uniqueIndex("email_idx").on(table.email)]
);

export const linksTable = pgTable("links", {
  id: uuid().primaryKey().defaultRandom(),
  platform: text().notNull(),
  url: text().notNull(),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id),
});
