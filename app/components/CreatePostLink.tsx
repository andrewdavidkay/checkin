"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export function CreatePostLink() {
  const { data: session } = authClient.useSession();

  return session ? (
    <Link
      href="/post"
      className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
    >
      Create post
    </Link>
  ) : (
    <Link href="/signup">Sign up</Link>
  );
}
