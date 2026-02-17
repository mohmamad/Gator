// This file defines the structure for command handling in the application.
// It includes types for command handlers and a registry to store them, as well as functions to register and execute commands.

export type CommandHandler = (
  cmdName: string,
  ...args: string[]
) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

// Function to register a command handler in the registry
export function registerCommand(
  registry: CommandsRegistry,
  commandName: string,
  handler: CommandHandler,
) {
  registry[commandName] = handler;
}

// Function to execute a command based on the command name and arguments
export async function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) {
  const handler = registry[cmdName];
  if (!handler) {
    throw new Error(`Command ${cmdName} not found.`);
  }
  await handler(cmdName, ...args);
}
