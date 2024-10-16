"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.media = exports.user = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.user = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.text)("id")
        .primaryKey()
        .$defaultFn(() => (0, cuid2_1.createId)()),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
});
exports.media = (0, pg_core_1.pgTable)("media", {
    id: (0, pg_core_1.text)("id")
        .primaryKey()
        .$defaultFn(() => (0, cuid2_1.createId)()),
    name: (0, pg_core_1.text)("name").notNull(),
    originalName: (0, pg_core_1.text)("original_name").notNull(),
    duration: (0, pg_core_1.integer)("duration").notNull(),
    releaseYear: (0, pg_core_1.integer)("release_year").notNull(),
    actors: (0, pg_core_1.jsonb)("actors").notNull(),
    categories: (0, pg_core_1.jsonb)("categories").notNull(),
    type: (0, pg_core_1.varchar)("type").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    director: (0, pg_core_1.text)("director").notNull(),
    awards: (0, pg_core_1.jsonb)("awards"),
    rating: (0, pg_core_1.integer)("rating").notNull(),
    coverLink: (0, pg_core_1.text)("cover_link").notNull(),
    trailerLink: (0, pg_core_1.text)("trailer_link").notNull(),
});
