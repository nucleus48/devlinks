import { json, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export type LinkItem = {
  platform: string;
  url: string;
};

export const usersTable = pgTable(
  "users",
  {
    id: uuid().primaryKey().defaultRandom(),
    email: text().notNull(),
    password: text().notNull(),
    links: json().$type<LinkItem[]>(),
    imageUrl: text("image_url"),
    firstName: text("first_name"),
    lastName: text("last_name"),
    previewEmail: text("preview_email"),
  },
  (table) => [uniqueIndex("email_idx").on(table.email)]
);
