import Link from "next/link";
import { db } from "@/lib/database";
import { posts, user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { slugify } from "@/lib/slug";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = slugify(rawSlug) || rawSlug;

  const [post] = await db
    .select({
      id: posts.id,
      title: posts.title,
      description: posts.description,
      photoUrl: posts.photoUrl,
      createdAt: posts.createdAt,
      username: user.username,
    })
    .from(posts)
    .innerJoin(user, eq(posts.userId, user.id))
    .where(eq(posts.slug, slug))
    .limit(1);

  if (!post) notFound();

  return (
    <article>
      <Link
        href={`/${post.username}`}
        className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
      >
        @{post.username}
      </Link>
      <h1 className="mt-2 text-xl font-semibold">{post.title}</h1>
      {post.description && (
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{post.description}</p>
      )}
      <img
        src={post.photoUrl}
        alt=""
        className="mt-4 max-w-lg rounded-lg"
      />
    </article>
  );
}
