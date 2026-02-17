// Entry point of the application.
// It processes command-line arguments, sets up the command registry, and executes the appropriate command based on user input.

import { CommandsRegistry, registerCommand, runCommand } from "./commands";
import { handlerLogin } from "./loginHandler";
import { handlerRigster } from "./registerHandler";
import { handlerReset } from "./resetHandler";

// Main function to process command-line arguments and execute commands
async function main() {
  const commandargs = ["login", "register"];
  if (process.argv.length === 2) {
    console.error("Not enough arguments were provided.");
    process.exit(1);
  } else if (
    process.argv.length === 3 &&
    commandargs.includes(process.argv[2])
  ) {
    console.error("A username is required");
    process.exit(1);
  }
  const commandRegistry: CommandsRegistry = {};
  registerCommand(commandRegistry, "login", handlerLogin);
  registerCommand(commandRegistry, "register", handlerRigster);
  registerCommand(commandRegistry, "reset", handlerReset);
  const command = process.argv.slice(2);
  try {
    await runCommand(commandRegistry, command[0], command[1]);
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
