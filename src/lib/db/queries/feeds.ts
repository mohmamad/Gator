// This file defines the database query functions related to feeds, including adding a new feed to the database.
import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";
import { readConfig } from "../../../config";
import { UUID } from "node:crypto";
import { sql } from "drizzle-orm";

export type Feed = typeof feeds.$inferSelect;
// Function to add a new feed to the database, associated with the currently logged-in user.
export async function addFeed(name: string, URL: string) {
  const userName = readConfig().currentUserName;
  const userId = await db
    .select()
    .from(users)
    .where(eq(users.name, userName))
    .then((res) => res[0].id);
  if (!userId) {
    throw new Error("User not found");
  }
  const insertedFeed = await db
    .insert(feeds)
    .values({ url: URL, name: name, userId: userId })
    .returning();
  return insertedFeed[0];
}

// Function to retrieve all feeds from the database.
export async function getFeeds() {
  return await db.select().from(feeds);
}

// Function to retrieve a feed from the database by its URL.
export async function getFeedByUrl(url: string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
  return result;
}

// Function to set the last fetched timestamp for a feed in the database by its ID.
export async function setLastFetchedAt(feedId: UUID) {
  await db
    .update(feeds)
    .set({ lastFetchedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(feeds.id, feedId));
}

// Function to retrieve the next feed to fetch based on the last fetched timestamp, prioritizing feeds that have not been fetched recently.
export async function getNextFeedToFetch(): Promise<Feed | undefined> {
  const [result] = await db.execute(
    sql`select * from feeds order by last_fetched_at asc nulls first limit 1`,
  );
  return result as Feed;
}
