-- Add slug as nullable first so we can backfill
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "slug" text;
--> statement-breakpoint
-- Backfill slug from title (lowercase, spaces to hyphens, strip special chars)
UPDATE "posts" SET "slug" = lower(regexp_replace(regexp_replace(trim("title"), '\s+', '-', 'g'), '[^\w\-]', '', 'g')) WHERE "slug" IS NULL;
--> statement-breakpoint
-- Fallback for empty slug (e.g. title was only special chars)
UPDATE "posts" SET "slug" = 'post-' || left("id", 8) WHERE "slug" = '' OR "slug" IS NULL;
--> statement-breakpoint
-- Handle duplicate slugs: append short id suffix
UPDATE "posts" SET "slug" = "slug" || '-' || left("id", 8)
WHERE "slug" IN (SELECT "slug" FROM "posts" GROUP BY "slug" HAVING count(*) > 1);
--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "slug" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_slug_unique" UNIQUE("slug");
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_title_unique" UNIQUE("title");
--> statement-breakpoint
-- Backfill null photo_url for existing rows before making it required
UPDATE "posts" SET "photo_url" = 'https://placehold.co/1x1/png' WHERE "photo_url" IS NULL;
--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "photo_url" SET NOT NULL;
