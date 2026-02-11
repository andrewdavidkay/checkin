import { db } from "@/lib/database";
import { user, favs } from "@/lib/schema";
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

  const userFavs = await db
    .select()
    .from(favs)
    .where(eq(favs.userId, profile.id))
    .orderBy(desc(favs.createdAt));

  return (
    <div>
      <h1>{profile.username}</h1>

      <ul className="flex flex-wrap gap-3 list-none p-0 m-0" aria-label="Favs">
        {userFavs.map((fav) => (
          <li key={fav.id} className="inline">
            {fav.title} — {fav.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
