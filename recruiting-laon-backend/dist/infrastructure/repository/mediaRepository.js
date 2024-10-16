"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaRepository = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const drizzle_orm_1 = require("drizzle-orm");
const connection_1 = require("../database/connection");
const schema_1 = require("../database/schema");
class MediaRepository {
    async create(media) {
        await connection_1.db.insert(schema_1.media).values({
            id: (0, cuid2_1.createId)(),
            name: media.name,
            originalName: media.originalName,
            duration: media.duration,
            releaseYear: media.releaseYear,
            actors: media.actors,
            categories: media.categories,
            type: media.type,
            description: media.description,
            director: media.director,
            awards: media.awards,
            rating: media.rating,
            coverLink: media.coverLink,
            trailerLink: media.trailerLink,
        });
        return media;
    }
    async findBySearchTerm(searchTerm, page, pageSize) {
        const offset = (page - 1) * pageSize;
        const searchPattern = `%${searchTerm}%`;
        const totalResult = await connection_1.db
            .select({ count: (0, drizzle_orm_1.sql) `COUNT(*)` })
            .from(schema_1.media)
            .where((0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(schema_1.media.name, searchPattern), (0, drizzle_orm_1.sql) `EXISTS (
							SELECT 1
							FROM jsonb_array_elements_text(${schema_1.media.actors}) AS actor
							WHERE actor ILIKE ${searchPattern}
					)`, (0, drizzle_orm_1.ilike)(schema_1.media.director, searchPattern)));
        const total = Number(totalResult[0]?.count) || 0;
        const query = await connection_1.db
            .select()
            .from(schema_1.media)
            .where((0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(schema_1.media.name, searchPattern), (0, drizzle_orm_1.sql) `EXISTS (
							SELECT 1
							FROM jsonb_array_elements_text(${schema_1.media.actors}) AS actor
							WHERE actor ILIKE ${searchPattern}
					)`, (0, drizzle_orm_1.ilike)(schema_1.media.director, searchPattern)))
            .limit(pageSize)
            .offset(offset);
        const items = query.map((item) => ({
            ...item,
            actors: item.actors
                ? item.actors.map(String)
                : [],
            categories: item.categories
                ? item.categories.map(String)
                : [],
            awards: item.awards
                ? item.awards.map(String)
                : [],
            type: item.type,
        }));
        return { items, total };
    }
}
exports.MediaRepository = MediaRepository;
