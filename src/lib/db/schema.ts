// This file defines the database schema for the application using Drizzle ORM.

import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";

// Define the user database schema using Drizzle ORM
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
});
