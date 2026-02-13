import Link from "next/link";
import { db } from "@/lib/database";
import { posts, user } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";

export async function PostsList() {
  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      description: posts.description,
      photoUrl: posts.photoUrl,
      createdAt: posts.createdAt,
      userId: posts.userId,
      username: user.username,
    })
    .from(posts)
    .innerJoin(user, eq(posts.userId, user.id))
    .orderBy(desc(posts.createdAt))
    .limit(50);

  return (
    <ul className="mt-6 flex flex-col gap-4 list-none p-0 m-0" aria-label="Posts">
      {allPosts.map((post) => (
        <li key={post.id} className="border-b border-zinc-200 pb-4 last:border-0 dark:border-zinc-800">
          <Link
            href={`/${post.username}`}
            className="text-xs font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            @{post.username}
          </Link>
          <p className="mt-1 font-medium">{post.title}</p>
          {post.description && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {post.description}
            </p>
          )}
          {post.photoUrl && (
            <img
              src={post.photoUrl}
              alt=""
              className="mt-2 max-w-sm rounded-lg"
            />
          )}
        </li>
      ))}
    </ul>
  );
}
