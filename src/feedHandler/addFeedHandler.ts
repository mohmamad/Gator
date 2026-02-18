// This file defines the handler for the "addfeed" command, which allows users to add a new feed to the system.
import { addFeed } from "../lib/db/queries/feeds";
import { printFeed } from "./printFeedHandler";
import { createFeedFollow } from "../lib/db/queries/feedFollows";
import { UUID } from "crypto";
import { getUserByName } from "../lib/db/queries/users";
import { readConfig } from "../config";

// Function to handle the addfeed command, which adds a new feed to the database.
export async function handlerAddFeed(cmdName: string, ...args: string[]) {
  const userName = readConfig().currentUserName;
  if (!userName) {
    throw new Error("No user is currently logged in. Please login first.");
  }
  const user = await getUserByName(userName);
  try {
    const feed = await addFeed(args[0], args[1]);
    try {
      await createFeedFollow(feed.id as UUID, user.id as UUID);
      console.log(`User ${userName} is now following feed ${feed.name}`);
    } catch (error) {
      console.error(`User ${userName} is already following feed ${feed.name}`);
    }
    printFeed(feed);
    console.log(`Feed ${args[0]} added successfully.`);
  } catch (error) {
    console.error(`Feed already exists: ${args[0]}`);
  }
}
