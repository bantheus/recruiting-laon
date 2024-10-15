import { createId } from "@paralleldrive/cuid2";
import { integer, jsonb, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
});

export const media = pgTable("media", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text("name").notNull(),
	originalName: text("original_name").notNull(),
	duration: integer("duration").notNull(),
	releaseYear: integer("release_year").notNull(),
	actors: jsonb("actors").notNull(),
	categories: jsonb("categories").notNull(),
	type: varchar("type").notNull(),
	description: text("description").notNull(),
	director: text("director").notNull(),
	awards: jsonb("awards"),
	rating: integer("rating").notNull(),
	coverLink: text("cover_link").notNull(),
	trailerLink: text("trailer_link").notNull(),
});
