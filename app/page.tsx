import { CreatePostLink } from "./components/CreatePostLink";
import { PostsList } from "./components/PostsList";

export default function Home() {
  return (
    <div>
      <main>
        <CreatePostLink />
        <PostsList />
      </main>
    </div>
  );
}
