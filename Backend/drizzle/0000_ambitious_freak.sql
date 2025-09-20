CREATE TABLE IF NOT EXISTS "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"short_code" text NOT NULL,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_short_code_unique" UNIQUE("short_code")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "short_code_idx" ON "links" USING btree ("short_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "links" USING btree ("created_at");