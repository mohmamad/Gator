import { UUID } from "node:crypto";
import { readConfig } from "../config";
import {
  createFeedFollow,
  getFeedFollowsForUser,
} from "../lib/db/queries/feedFollows";
import { getFeedByUrl } from "../lib/db/queries/feeds";
import { getUserByName } from "../lib/db/queries/users";

export async function handlerFollow(cmdName: string, ...args: string[]) {
  const feed = await getFeedByUrl(args[0]);
  const userName = readConfig().currentUserName;
  const user = await getUserByName(userName);
  if (!feed) {
    throw new Error(
      `Feed with URL ${args[0]} not found. Please add the feed first.`,
    );
  }
  if (!user) {
    throw new Error(`User ${userName} not found. Please login first.`);
  }
  try {
    await createFeedFollow(feed.id as UUID, user.id as UUID);
    console.log(`User ${userName} is now following feed ${feed.name}`);
  } catch (error) {
    console.error(`User ${userName} is already following feed ${feed.name}`);
  }
}

export async function handlerFollowing(cmdName: string, ...args: string[]) {
  const userName = readConfig().currentUserName;
  const user = await getUserByName(userName);
  if (!user) {
    throw new Error(`User ${userName} not found. Please login first.`);
  }
  const feedFollows = await getFeedFollowsForUser(user.id as UUID);
  console.log(`Feeds followed by ${userName}:`);
  for (const feedFollow of feedFollows) {
    const feed = await getFeedByUrl(feedFollow.feeds.url);
    console.log(`- ${feed.name}`);
  }
}
