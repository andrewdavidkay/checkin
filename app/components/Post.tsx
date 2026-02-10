"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPost } from "@/app/actions/post";
import { authClient } from "@/lib/auth-client";

export default function Post() {
  const { data: session } = authClient.useSession();

  return (
    <form action={createPost} className="space-y-3">
      {/* Pass the current user id through a hidden field so the server action can use it */}
      <input type="hidden" name="userId" value={session?.user.id ?? ""} />

      <label
        htmlFor="content"
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        How was your day?
      </label>

      <Textarea
        id="content"
        name="content"
        rows={4}
        placeholder="Write about your day…"
      />

      <Button type="submit" variant="outline">
        Submit
      </Button>
    </form>
  );
}
