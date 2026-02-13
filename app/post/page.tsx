"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Post from "@/app/components/Post";

export default function NewPostPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="text-sm text-zinc-500">Checking…</div>
    );
  }

  if (!session) {
    return (
      <div>
        <p className="text-zinc-600 dark:text-zinc-400">
          You need to be signed in to create a post.
        </p>
        <Link
          href="/login"
          className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">New post</h1>
      <Post />
    </div>
  );
}
