import { get } from "node:http";
import { User } from "./lib/db/queries/users";
import { getPostsForUser } from "./lib/db/queries/posts";
import { UUID } from "node:crypto";

export async function handlerBrowse(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  let limit = 2;
  if (args.length > 0) {
    const parsedLimit = parseInt(args[0]);
    if (!isNaN(parsedLimit)) {
      limit = parsedLimit;
    } else {
      throw new Error("Invalid limit provided. Please provide a valid number.");
    }
  }
  const posts = await getPostsForUser(user.id as UUID, limit);

  for (const post of posts) {
    console.log(`Title: ${post.posts.title}`);
    console.log(`Description: ${post.posts.description}`);
    console.log(`Published At: ${post.posts.publishedAt}`);
    console.log(`URL: ${post.posts.url}`);
    console.log("--------------------------------------------------");
  }
}
