// This file defines the aggregator handler for the application, which fetches and displays RSS feed data from a specified URL.

import { fetchFeed } from "./RSS";

// Function to handle the aggregator command, which fetches and displays RSS feed data from a specified URL.
export async function handlerAggregator(cmdName: string, ...args: string[]) {
  const result = await fetchFeed("https://www.wagslane.dev/index.xml");
  console.log("Channel:");
  console.log("Feed Title:", result.channel.title);
  console.log("Feed Link:", result.channel.link);
  console.log("Feed Description:", result.channel.description);
  console.log("Items:");
  result.channel.item.forEach((item) => {
    console.log(`Title: ${item.title}`);
    console.log(`Link: ${item.link}`);
    console.log(`Published: ${item.pubDate}`);
    console.log(`Description: ${item.description}`);
    console.log(`pubDate: ${item.pubDate}`);
    console.log("--------------------------------------------------");
  });
}
