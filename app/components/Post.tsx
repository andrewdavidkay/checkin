"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPost } from "@/app/actions/post";
import { authClient } from "@/lib/auth-client";

export default function Post() {
  const { data: session } = authClient.useSession();

  return (
    <form action={createPost} className="space-y-3">
      <input type="hidden" name="userId" value={session?.user.id ?? ""} />

      <label
        htmlFor="title"
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        Favorite Anything
      </label>
      <input
        id="title"
        name="title"
        type="text"
        className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50"
        placeholder="hit us with your best shot"
      />

      <label
        htmlFor="description"
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        Favorite Description
      </label>

      <Textarea
        id="description"
        name="description"
        rows={4}
        placeholder="Write about your favorite…"
      />

      <label
        htmlFor="photoUrl"
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        Photo URL (optional)
      </label>

      <input
        id="photoUrl"
        name="photoUrl"
        type="url"
        placeholder="https://…"
        className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50"
      />

      <Button type="submit" variant="outline">
        Submit
      </Button>
    </form>
  );
}
