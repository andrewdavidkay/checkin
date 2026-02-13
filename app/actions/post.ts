"use server";

import { put } from "@vercel/blob";
import { db } from "@/lib/database";
import { posts } from "@/lib/schema";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const photo = formData.get("photo");
  const userId = formData.get("userId");

  const titleStr =
    typeof title === "string" && title.trim() ? title.trim() : "Untitled";

  if (typeof userId !== "string" || !userId) {
    throw new Error("Not authenticated");
  }

  let photoUrl: string | null = null;
  if (photo instanceof File && photo.size > 0) {
    const blob = await put(`posts/${crypto.randomUUID()}-${photo.name}`, photo, {
      access: "public",
      addRandomSuffix: true,
    });
    photoUrl = blob.url;
  }

  await db.insert(posts).values({
    id: crypto.randomUUID(),
    userId,
    title: titleStr,
    description: typeof description === "string" ? description : null,
    photoUrl,
  });
}
