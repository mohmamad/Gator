// This file defines the handler for the "unfollow" command, which allows a user to unfollow a feed by its URL.
// It interacts with the database to remove the follow relationship between the user and the specified feed.
import { unfollowFeed } from "../lib/db/queries/feedFollows";
import { getFeedByUrl } from "../lib/db/queries/feeds";
import { User } from "../lib/db/queries/users";

// Function to handle the "unfollow" command, which allows a user to unfollow a feed by its URL.
export async function handlerUnfollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  const feed = await getFeedByUrl(args[0]);
  if (!feed) {
    throw new Error("Feed not found");
  }
  await unfollowFeed(feed.id, user.id);
}
