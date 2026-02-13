"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
        >
          lowdown
        </Link>
        <div className="flex items-center gap-3">
          {isPending ? (
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              Checking…
            </span>
          ) : session?.user ? (
            <>
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                <Link href={`/${session.user.username}`}>
                  Logged in as{" "}
                  {session.user.username ?? session.user.email ?? "user"}
                </Link>
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full border border-zinc-200 bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-zinc-200 bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
