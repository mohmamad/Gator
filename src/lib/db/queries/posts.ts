import { db } from "..";
import { feeds, posts } from "../schema.ts";
import { UUID } from "node:crypto";
import { eq, desc } from "drizzle-orm";
import { RSSItem } from "../../../RSS.ts";

export async function createPost(
  item: RSSItem,
  publishedAt: Date,
  description: string,
  feedId: UUID,
) {
  await db.insert(posts).values({
    title: item.title,
    url: item.link,
    feedId: feedId,
    publishedAt: publishedAt,
    description: description,
  });
}

export async function getPostsForUser(userId: UUID, limit: number) {
  console.log(
    `Fetching posts for user with ID: ${userId} with limit: ${limit}`,
  );
  const result = await db
    .select({ posts: posts })
    .from(posts)
    .innerJoin(feeds, eq(posts.feedId, feeds.id))
    .where(eq(feeds.userId, userId))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
  return result;
}
