"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <div className="max-w-3xl mx-auto">
      <main>
        {session ? (
          <div>
            <h2>How was your day?</h2>
            <Textarea className="w-full h-full" />
          </div>
        ) : (
          <Link href="/signup">Sign up</Link>
        )}
      </main>
    </div>
  );
}
