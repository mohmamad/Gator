import { eq } from "drizzle-orm";
import { db } from "..";
import { feed_follows, feeds, users } from "../schema";
import { UUID } from "node:crypto";

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

export async function getFeedFollowsForUser(userId: UUID) {
  const feedFollows = await db
    .select()
    .from(feed_follows)
    .innerJoin(feeds, eq(feed_follows.feedId, feeds.id))
    .innerJoin(users, eq(feed_follows.userId, users.id))
    .where(eq(feed_follows.userId, userId));
  return feedFollows;
}
