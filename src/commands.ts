export type CommandHandler = (cmdName: string, ...args: string[]) => void;

export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(
  registry: CommandsRegistry,
  commandName: string,
  handler: CommandHandler,
) {
  registry[commandName] = handler;
}

export function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) {
  const handler = registry[cmdName];
  if (!handler) {
    throw new Error(`Command ${cmdName} not found.`);
  }
  handler(cmdName, ...args);
}
