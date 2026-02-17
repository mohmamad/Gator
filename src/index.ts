import { CommandsRegistry, registerCommand, runCommand } from "./commands";
import { handlerLogin } from "./loginHandler";

function main() {
  if (process.argv.length === 2) {
    console.error("Not enough arguments were provided.");
    process.exit(1);
  } else if (process.argv.length === 3 && process.argv[2] === "login") {
    console.error("A username is required");
    process.exit(1);
  }
  const commandRegistry: CommandsRegistry = {
    login: handlerLogin,
  };
  registerCommand(commandRegistry, "login", handlerLogin);
  const command = process.argv.slice(2);
  runCommand(commandRegistry, command[0], command[1]);
}

main();
