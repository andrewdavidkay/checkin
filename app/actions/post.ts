"use server";

import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { db } from "@/lib/database";
import { posts } from "@/lib/schema";
import { slugify } from "@/lib/slug";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const photo = formData.get("photo");
  const userId = formData.get("userId");

  if (typeof userId !== "string" || !userId) {
    throw new Error("Not authenticated");
  }

  const titleStr = typeof title === "string" && title.trim() ? title.trim() : null;
  if (!titleStr) {
    throw new Error("Title is required");
  }

  if (!(photo instanceof File) || photo.size === 0) {
    throw new Error("Photo is required");
  }

  const [existingByTitle] = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.title, titleStr))
    .limit(1);
  if (existingByTitle) {
    throw new Error("A post with this title already exists");
  }

  let slug = slugify(titleStr);
  if (!slug) slug = `post-${crypto.randomUUID().slice(0, 8)}`;

  const [existingBySlug] = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);
  if (existingBySlug) {
    slug = `${slug}-${crypto.randomUUID().slice(0, 8)}`;
  }

  const blob = await put(`posts/${crypto.randomUUID()}-${photo.name}`, photo, {
    access: "public",
    addRandomSuffix: true,
  });

  await db.insert(posts).values({
    id: crypto.randomUUID(),
    userId,
    title: titleStr,
    slug,
    description: typeof description === "string" ? description : null,
    photoUrl: blob.url,
  });
}
