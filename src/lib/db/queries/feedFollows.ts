// This file contains functions to manage feed follows in the database, allowing users to follow and unfollow feeds,
// as well as retrieve their followed feeds.
import { eq } from "drizzle-orm";
import { db } from "..";
import { feed_follows, feeds, users } from "../schema";
import { UUID } from "node:crypto";

// Function to create a new feed follow in the database, associating a user with a feed they want to follow.
export async function createFeedFollow(feedId: UUID, userId: UUID) {
  const [insertedFeedFollow] = await db
    .insert(feed_follows)
    .values({ feedId: feedId, userId: userId })
    .returning();
  const [feedFollow] = await db
    .select()
    .from(feed_follows)
    .innerJoin(feeds, eq(feed_follows.feedId, feeds.id))
    .innerJoin(users, eq(feed_follows.userId, users.id))
    .where(eq(feed_follows.id, insertedFeedFollow.id))
    .limit(1);
  return feedFollow;
}

// Function to retrieve all feed follows for a specific user, including the associated feed and user information.
export async function getFeedFollowsForUser(userId: UUID) {
  const feedFollows = await db
    .select()
    .from(feed_follows)
    .innerJoin(feeds, eq(feed_follows.feedId, feeds.id))
    .innerJoin(users, eq(feed_follows.userId, users.id))
    .where(eq(feed_follows.userId, userId));
  return feedFollows;
}

// Function to delete a feed follow from the database based on feed ID and user ID.
export async function unfollowFeed(feedId: string, userId: string) {
  await db
    .delete(feed_follows)
    .where(eq(feed_follows.feedId, feedId) && eq(feed_follows.userId, userId))
    .execute();
}
