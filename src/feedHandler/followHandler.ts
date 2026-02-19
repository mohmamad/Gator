// This file contains the command handlers for following feeds and listing followed feeds.

import { UUID } from "node:crypto";
import {
  createFeedFollow,
  getFeedFollowsForUser,
} from "../lib/db/queries/feedFollows";
import { getFeedByUrl } from "../lib/db/queries/feeds";
import { User } from "../lib/db/queries/users";

// Function to handle the "follow" command, which allows a user to follow a feed by its URL.
export async function handlerFollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  const feed = await getFeedByUrl(args[0]);

  if (!feed) {
    throw new Error(
      `Feed with URL ${args[0]} not found. Please add the feed first.`,
    );
  }
  try {
    await createFeedFollow(feed.id as UUID, user.id as UUID);
    console.log(`User ${user.name} is now following feed ${feed.name}`);
  } catch (error) {
    console.error(`User ${user.name} is already following feed ${feed.name}`);
  }
}

// Function to handle the "following" command, which lists all feeds that the user is currently following.
export async function handlerFollowing(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  const feedFollows = await getFeedFollowsForUser(user.id as UUID);
  console.log(`Feeds followed by ${user.name}:`);
  for (const feedFollow of feedFollows) {
    const feed = await getFeedByUrl(feedFollow.feeds.url);
    console.log(`- ${feed.name}`);
  }
}
