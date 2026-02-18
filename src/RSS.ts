// This file defines the RSS feed fetching and parsing functionality for the application.
// It uses the fast-xml-parser library to parse the XML response from the RSS feed URL
// and returns a structured RSSFeed object containing the channel information and an array of RSSItem objects representing each item in the feed.

import { XMLParser } from "fast-xml-parser";

// Type definitions for the RSS feed structure
export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

// Type definition for an individual RSS item
export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

// Function to fetch and parse the RSS feed from the given URL and return a structured RSSFeed object.
export async function fetchFeed(feedURL: string) {
  const response = await fetch(feedURL, {
    headers: {
      "User-Agent": "gator",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch feed: ${response.status}`);
  }

  const xml = await response.text();
  const parser = new XMLParser();
  const feed = parser.parse(xml);
  const channel = feed.rss.channel;
  if (!channel) {
    throw new Error("Invalid RSS feed format.");
  }
  const { title, link, description } = channel;
  if (!title || !link || !description) {
    throw new Error("Invalid RSS feed format: Missing required fields.");
  }

  let rawItems = [];
  if (channel.item) {
    rawItems = Array.isArray(channel.item) ? channel.item : [channel.item];
  }

  const items: RSSItem[] = rawItems
    .map((item: any) => ({
      title: item.title || "",
      link: item.link || "",
      description: item.description || "",
      pubDate: item.pubDate || "",
    }))
    .filter((i: RSSItem) => i.title && i.link && i.description && i.pubDate);

  return {
    channel: {
      title,
      link,
      description,
      item: items,
    },
  };
}
