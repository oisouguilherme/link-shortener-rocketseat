import {
  pgTable,
  text,
  timestamp,
  integer,
  serial,
  index,
} from "drizzle-orm/pg-core";

export const links = pgTable(
  "links",
  {
    id: serial("id").primaryKey(),
    originalUrl: text("original_url").notNull(),
    shortCode: text("short_code").notNull().unique(),
    accessCount: integer("access_count").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    shortCodeIdx: index("short_code_idx").on(table.shortCode),
    createdAtIdx: index("created_at_idx").on(table.createdAt),
  })
);
