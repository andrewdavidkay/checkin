import Link from "next/link";
import { db } from "@/lib/database";
import { user, posts } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const [profile] = await db
    .select({
      id: user.id,
      name: user.name,
      username: user.username,
      displayUsername: user.displayUsername,
      image: user.image,
    })
    .from(user)
    .where(eq(user.username, username))
    .limit(1);

  if (!profile) notFound();

  const userPosts = await db
    .select({ id: posts.id, slug: posts.slug, title: posts.title, description: posts.description, photoUrl: posts.photoUrl })
    .from(posts)
    .where(eq(posts.userId, profile.id))
    .orderBy(desc(posts.createdAt));

  return (
    <div>
      <h1>{profile.username}</h1>
      <ul className="flex flex-col gap-3 list-none p-0 m-0" aria-label="Posts">
        {userPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/p/${post.slug}`} className="font-medium hover:underline">
              {post.title}
            </Link>
            {post.description && ` — ${post.description}`}
            <img
              src={post.photoUrl}
              alt=""
              className="mt-2 max-w-xs rounded-lg"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
