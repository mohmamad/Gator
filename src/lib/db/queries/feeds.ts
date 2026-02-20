// This file defines the database query functions related to feeds, including adding a new feed to the database.
import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";
import { readConfig } from "../../../config";

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

// Function to delete a feed from the database based on its URL and the user ID of the owner.
export async function deleteFeed(feedUrl: string, userId: string) {
  await db
    .delete(feeds)
    .where(eq(feeds.url, feedUrl) && eq(feeds.userId, userId))
    .execute();
}
