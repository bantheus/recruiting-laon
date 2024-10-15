CREATE TABLE IF NOT EXISTS "media" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"duration" integer NOT NULL,
	"release_year" integer NOT NULL,
	"actors" jsonb NOT NULL,
	"categories" jsonb NOT NULL,
	"type" varchar NOT NULL,
	"description" text NOT NULL,
	"director" text NOT NULL,
	"awards" jsonb,
	"rating" integer NOT NULL,
	"cover_link" text NOT NULL,
	"trailer_link" text NOT NULL
);
