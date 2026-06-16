ALTER TABLE "characters" ALTER COLUMN "imageUrl" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "imageUrl" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "team_categories" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ALTER COLUMN "created_at" SET NOT NULL;