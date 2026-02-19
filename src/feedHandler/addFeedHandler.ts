// This file defines the handler for the "addfeed" command, which allows users to add a new feed to the system.
import { addFeed } from "../lib/db/queries/feeds";
import { printFeed } from "./printFeedHandler";
import { createFeedFollow } from "../lib/db/queries/feedFollows";
import { UUID } from "crypto";
import { User } from "../lib/db/queries/users";

// Function to handle the addfeed command, which adds a new feed to the database.
export async function handlerAddFeed(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  try {
    const feed = await addFeed(args[0], args[1]);
    try {
      await createFeedFollow(feed.id as UUID, user.id as UUID);
      console.log(`User ${user.name} is now following feed ${feed.name}`);
    } catch (error) {
      console.error(`User ${user.name} is already following feed ${feed.name}`);
    }
    printFeed(feed);
    console.log(`Feed ${args[0]} added successfully.`);
  } catch (error) {
    console.error(`Feed already exists: ${args[0]}`);
  }
}
