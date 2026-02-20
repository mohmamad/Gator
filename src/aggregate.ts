// This file defines the aggregate function for marking a feed as fetched,
// which updates the last fetched timestamp for a given feed ID in the database.
import { UUID } from "node:crypto";
import {
  Feed,
  getNextFeedToFetch,
  setLastFetchedAt,
} from "./lib/db/queries/feeds";
import { fetchFeed } from "./RSS";

// Function to scrape feeds by getting the next feed to fetch from the database, marking it as fetched, fetching it and processing its items.
export async function scrapeFeeds() {
  const feed = await getNextFeedToFetch();
  if (!feed) {
    console.log("No feeds to fetch");
    return;
  }
  await setLastFetchedAt(feed.id as UUID);
  const fetchedFeed = await fetchFeed(feed.url);
  fetchedFeed.channel.item.forEach((item) => {
    console.log(`Title: ${item.title}`);
    console.log(`Link: ${item.link}`);
    console.log("-----------------------------");
  });
}
