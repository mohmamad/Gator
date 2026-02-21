// This file defines the aggregate function for marking a feed as fetched,
// which updates the last fetched timestamp for a given feed ID in the database.
import { UUID } from "node:crypto";
import {
  Feed,
  getNextFeedToFetch,
  setLastFetchedAt,
} from "./lib/db/queries/feeds";
import { fetchFeed } from "./RSS";
import { createPost } from "./lib/db/queries/posts";

// Function to scrape feeds by getting the next feed to fetch from the database, marking it as fetched, fetching it and processing its items.
export async function scrapeFeeds() {
  const feed = await getNextFeedToFetch();
  if (!feed) {
    console.log("No feeds to fetch");
    return;
  }

  const fetchedFeed = await fetchFeed(feed.url);
  for (const item of fetchedFeed.channel.item) {
    await createPost(
      item,
      parsePublishDate(item.pubDate),
      item.description,
      feed.id as UUID,
    );
  }
  await setLastFetchedAt(feed.id as UUID);
}

// Function to parse a publish date string into a Date object, returning null if the date string is invalid or not provided.
export function parsePublishDate(dateStr?: string): Date {
  if (!dateStr) throw new Error("No date string provided");

  const d = new Date(dateStr);

  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date string: ${dateStr}`);
  }

  return d;
}
