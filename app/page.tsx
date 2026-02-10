"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Post from "@/app/components/Post";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <div className="max-w-3xl mx-auto">
      <main>{session ? <Post /> : <Link href="/signup">Sign up</Link>}</main>
    </div>
  );
}
