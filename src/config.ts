// This file defines the configuration management for the application,
// including reading and writing the config file, as well as setting the current user.

import fs from "fs";
import os from "os";
import path from "path";

export type config = {
  dbUrl: string;
  currentUserName: string;
};

// Function to set the current user in the config file
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

// Function to get the path to the config file in the user's home directory
export function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}

export function validateConfig(rawConfig: any): config {
  if (!rawConfig.dbUrl || !rawConfig.currentUserName) {
    throw new Error(
      "Invalid config file. Please ensure dbUrl and currentUserName are set.",
    );
  }
  return rawConfig as config;
}

// Function to write the config object to the config file
export function writeConfig(config: config) {
  const validatedConfig = validateConfig(config);
  const configFilePath = getConfigFilePath();
  const toWriteConfig = {
    db_url: validatedConfig.dbUrl,
    current_user_name: validatedConfig.currentUserName,
  };
  fs.writeFileSync(configFilePath, JSON.stringify(toWriteConfig));
}
