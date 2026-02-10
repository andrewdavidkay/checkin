"use server";

import { db } from "@/lib/database";
import { post } from "@/lib/schema";

export async function createPost(formData: FormData) {
  const content = formData.get("content");
  const userId = formData.get("userId");

  if (typeof content !== "string" || !content.trim()) {
    // Nothing to save
    return;
  }

  if (typeof userId !== "string" || !userId) {
    // In a real app you might throw or redirect to login
    throw new Error("Not authenticated");
  }

  await db.insert(post).values({
    id: crypto.randomUUID(),
    userId,
    content,
  });
}
