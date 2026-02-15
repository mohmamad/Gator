import fs from "fs";
import os from "os";
import path from "path";

export type config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(userName: string) {
  const config = readConfig();
  config.currentUserName = userName;
  writeConfig(config);
}
export function readConfig(): config {
  const configFilePath = getConfigFilePath();
  if (!fs.existsSync(configFilePath)) {
    throw new Error("Config file not found.");
  } else {
    const configContent = fs.readFileSync(configFilePath, "utf-8");
    const parsedConfig = JSON.parse(configContent);

    return {
      dbUrl: parsedConfig.db_url,
      currentUserName: parsedConfig.current_user_name,
    } as config;
  }
}

export function getConfigFilePath(): string {
  return path.join(os.homedir(), "Gator", ".gatorconfig.json");
}

export function validateConfig(rawConfig: any): config {
  if (!rawConfig.dbUrl || !rawConfig.currentUserName) {
    throw new Error(
      "Invalid config file. Please ensure dbUrl and currentUserName are set.",
    );
  }
  return rawConfig as config;
}

export function writeConfig(config: config) {
  const validatedConfig = validateConfig(config);
  const configFilePath = getConfigFilePath();
  const toWriteConfig = {
    db_url: validatedConfig.dbUrl,
    current_user_name: validatedConfig.currentUserName,
  };
  fs.writeFileSync(configFilePath, JSON.stringify(toWriteConfig));
}
