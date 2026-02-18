// Entry point of the application.
// It processes command-line arguments, sets up the command registry, and executes the appropriate command based on user input.

import { handlerAggregator } from "./aggregatorHandler";
import { CommandsRegistry, registerCommand, runCommand } from "./commands";
import { handlerGetUsers } from "./userHandler/getUsersHandler";
import { handlerLogin } from "./userHandler/loginHandler";
import { handlerRigster } from "./userHandler/registerHandler";
import { handlerReset } from "./userHandler/resetHandler";
import { handlerAddFeed } from "./feedHandler/addFeedHandler";
import { argv } from "process";
import { printAllFeeds } from "./feedHandler/printFeedHandler";
import { handlerFollow, handlerFollowing } from "./feedHandler/followHandler";

// Main function to process command-line arguments and execute commands
async function main() {
  const commandRegistry: CommandsRegistry = {};
  registerCommand(commandRegistry, "login", handlerLogin);
  registerCommand(commandRegistry, "register", handlerRigster);
  registerCommand(commandRegistry, "reset", handlerReset);
  registerCommand(commandRegistry, "users", handlerGetUsers);
  registerCommand(commandRegistry, "agg", handlerAggregator);
  registerCommand(commandRegistry, "addfeed", handlerAddFeed);
  registerCommand(commandRegistry, "feeds", printAllFeeds);
  registerCommand(commandRegistry, "follow", handlerFollow);
  registerCommand(commandRegistry, "following", handlerFollowing);

  const commandargs = ["login", "register"];
  if (process.argv.length === 2) {
    console.error("Not enough arguments were provided.");
    process.exit(1);
  } else if (process.argv.length === 3 && commandargs.includes(argv[2])) {
    console.error("A username is required");
    process.exit(1);
  } else if (process.argv.length < 5 && argv[2] === "addfeed") {
    console.error("Invalid command or insufficient arguments.");
    process.exit(1);
  }
  const command = argv.slice(2);
  try {
    await runCommand(commandRegistry, command[0], ...command.slice(1));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
    process.exit(1);
  }
  process.exit(0);
}

main();
