// This file defines the register handler for the application, which allows users to create a new account and set their username in the configuration file.
import { createUser, getUserByName } from "../lib/db/queries/users";
import { setUser } from "../config";

// Function to handle the register command, which creates a new user and sets the current user in the config file
export async function handlerRigster(cmdName: string, ...args: string[]) {
  const user = await getUserByName(args[0]);
  if (user) {
    throw new Error(`User ${args[0]} already exists.`);
  } else {
    const result = await createUser(args[0]);
    setUser(args[0]);
    console.log(`User ${args[0]} registered successfully.`);
    console.log(result);
  }
}
