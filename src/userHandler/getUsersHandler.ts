// This file defines the get-users handler for the application, which retrieves and displays all users from the database.
import { readConfig } from "../config";
import { getUsers } from "../lib/db/queries/users";

// Function to handle the get-users command, which retrieves and displays all users from the database.
export async function handlerGetUsers(cmdName: string, ...args: string[]) {
  const users = await getUsers();
  const logedInUser = readConfig().currentUserName;
  users.forEach((user) => {
    const current = user.name === logedInUser ? "(current)" : "";
    console.log(`* ${user.name} ${current}`);
  });
}
