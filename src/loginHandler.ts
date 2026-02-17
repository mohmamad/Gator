import { setUser } from "./config";

export function handlerLogin(cmdName: string, ...args: string[]) {
  setUser(args[0]);
  console.log(`Username has been set to ${args[0]}`);
}
