// This file initializes the database connection
// using Drizzle ORM and exports the database instance for use in other parts of the application.

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { readConfig } from "../../config";

// Initialize the database connection using Drizzle ORM
const config = readConfig();
const conn = postgres(config.dbUrl);
export const db = drizzle(conn, { schema });
