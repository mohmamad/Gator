// This file defines the database queries related to users, including creating a user, retrieving a user by name, and deleting all users.

import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";
import { UUID } from "node:crypto";

// Function to create a new user in the database with the given name.
export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

// Function to retrieve a user from the database by their name.
export async function getUserByName(name: string) {
  const result = await db.select().from(users).where(eq(users.name, name));
  return result[0];
}

// Function to delete all users from the database.
export async function deleteUsers() {
  await db.delete(users).execute();
}

// Function to retrieve all users from the database.
export async function getUsers() {
  const result = await db.select().from(users);
  return result;
}

// Function to retrieve a user from the database by their ID.
export async function getUserById(id: UUID) {
  const [result] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  return result;
}
