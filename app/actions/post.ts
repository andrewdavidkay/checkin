"use server";

import { db } from "@/lib/database";
import { posts } from "@/lib/schema";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const photoUrl = formData.get("photoUrl");
  const userId = formData.get("userId");

  const titleStr =
    typeof title === "string" && title.trim() ? title.trim() : "Untitled";

  if (typeof userId !== "string" || !userId) {
    throw new Error("Not authenticated");
  }

  await db.insert(posts).values({
    id: crypto.randomUUID(),
    userId,
    title: titleStr,
    description: typeof description === "string" ? description : null,
    photoUrl:
      typeof photoUrl === "string" && photoUrl.trim()
        ? photoUrl.trim()
        : null,
  });
}
