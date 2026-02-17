// This file defines the reset handler for the application, which allows users to reset the database by deleting all users.

import { deleteUsers } from "./lib/db/queries/users";

// Function to handle the reset command, which deletes all users from the database.
export async function handlerReset(cmdName: string, ...args: string[]) {
  console.log("Resetting the database...");
  await deleteUsers();
  console.log("Database reset successfully.");
}
