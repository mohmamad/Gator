import { CommandHandler } from "./commands";
import { getUserByName, User } from "./lib/db/queries/users";
import { readConfig } from "./config";

export type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

export type middlewareLoggedIn = (
  handler: UserCommandHandler,
) => CommandHandler;

export const middlewareLoggedIn: middlewareLoggedIn =
  (handler) =>
  async (cmdName, ...args) => {
    const userName = readConfig().currentUserName;
    if (!userName) {
      console.log("❌ You must be logged in to run this command.");
      return;
    }
    const user = await getUserByName(userName);

    await handler(cmdName, user, ...args);
  };
