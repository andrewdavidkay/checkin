"use server";

import { db } from "@/lib/database";
import { favs } from "@/lib/schema";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const userId = formData.get("userId");

  if (typeof content !== "string" || !content.trim()) {
    return;
  }

  const titleStr =
    typeof title === "string" && title.trim() ? title.trim() : "Untitled";

  if (typeof userId !== "string" || !userId) {
    throw new Error("Not authenticated");
  }

  await db.insert(favs).values({
    id: crypto.randomUUID(),
    userId,
    title: titleStr,
    content,
  });
}
