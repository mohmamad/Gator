// This file defines the handler for the "feeds" command,
// which allows users to print all feeds in the system along with their associated user information.

import { feeds, users } from "../lib/db/schema";
import { getFeeds } from "../lib/db/queries/feeds";
import { getUserById } from "../lib/db/queries/users";
import { UUID } from "node:crypto";

export type Feed = typeof feeds.$inferSelect;

// Function to print the details of a feed, including its name, URL, and associated user information.
export function printFeed(feed: Feed): void {
  console.log("Feed:", feed);
}

// Function to print all feeds in the system, along with their associated user information.
export async function printAllFeeds() {
  console.log("Feeds:");
  const feeds = await getFeeds();

  for (const feed of feeds) {
    console.log(`*Feed name: ${feed.name}`);
    console.log(`Feed URL: ${feed.url}`);

    const user = await getUserById(feed.userId as UUID);

    console.log(`User: ${user.name}`);
    console.log("-----------------------------");
  }
}
