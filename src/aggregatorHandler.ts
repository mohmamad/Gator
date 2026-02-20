// This file defines the aggregator handler for the application, which fetches and displays RSS feed data from a specified URL.

import { scrapeFeeds } from "./aggregate.ts";

// Function to handle the aggregator command, which fetches and displays RSS feed data from a specified URL.
export async function handlerAggregator(cmdName: string, ...args: string[]) {
  const durationStr = args[0];
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);
  if (!match) {
    throw new Error(
      "Invalid duration format. Please provide a duration like '10s', '5m', or '1h'.",
    );
  }
  const value = parseInt(match[1], 10);
  const unit = match[2];
  let timeBetweenRequests;

  switch (unit) {
    case "ms":
      timeBetweenRequests = value;
      break;

    case "s":
      timeBetweenRequests = value * 1_000;
      break;

    case "m":
      timeBetweenRequests = value * 60_000;
      break;

    case "h":
      timeBetweenRequests = value * 3_600_000;
      break;

    default:
      throw new Error("Unknown time unit");
  }

  scrapeFeeds().catch(handleError);

  const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
  }, timeBetweenRequests);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });
}

// Function to handle errors that occur during the feed aggregation process, logging them to the console for debugging purposes.
export function handleError(error: unknown) {
  console.error("Error in aggregator handler:", error);
}
