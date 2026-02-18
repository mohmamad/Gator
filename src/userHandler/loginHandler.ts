// This file defines the login handler for the application, which allows users to set their username in the configuration file.

import { setUser } from "../config";
import { getUserByName } from "../lib/db/queries/users";

// Function to handle the login command, which sets the current user in the config file
export async function handlerLogin(cmdName: string, ...args: string[]) {
  const result = await getUserByName(args[0]);
  if (!result) {
    throw new Error(`User ${args[0]} not found. Please register first.`);
  }
  setUser(args[0]);
  console.log(`Username has been set to ${args[0]}`);
}
