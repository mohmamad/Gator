// This file defines the database schema for the application using Drizzle ORM.

import { desc } from "drizzle-orm";
import { pgTable, timestamp, uuid, text, unique } from "drizzle-orm/pg-core";

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

// Define the feed database schema using Drizzle ORM, with a foreign key reference to the users table
export const feeds = pgTable("feeds", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  url: text("url").notNull().unique(),
  name: text("name").notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  lastFetchedAt: timestamp("last_fetched_at").defaultNow(),
});

// Define the feed_follows database schema using Drizzle ORM, which represents the many-to-many relationship between users and feeds
export const feed_follows = pgTable(
  "feed_follows",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    feedId: uuid("feed_id")
      .references(() => feeds.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      uniqueFeedUser: unique().on(table.feedId, table.userId),
    };
  },
);

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  title: text("title").notNull(),
  url: text("url").notNull(),
  description: text("description"),
  publishedAt: timestamp("published_at"),
  feedId: uuid("feed_id")
    .references(() => feeds.id, { onDelete: "cascade" })
    .notNull(),
});
