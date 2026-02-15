import { readConfig, setUser } from "./config";

function main() {
  setUser("Mohammad");
  const config = readConfig();
  console.log(config);
}

main();
