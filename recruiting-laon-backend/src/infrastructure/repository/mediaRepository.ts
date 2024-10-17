import { createId } from "@paralleldrive/cuid2";
import { eq, ilike, or, sql } from "drizzle-orm";
import type { Media, MediaType } from "../../domain/media/media";
import type { IMediaRepository } from "../../domain/media/repository/IMediaRepository";
import { db } from "../database/connection";
import { media as mediaSchema } from "../database/schema";

export class MediaRepository implements IMediaRepository {
	async create(media: Media): Promise<Media> {
		await db.insert(mediaSchema).values({
			id: createId(),
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

	async findBySearchTerm(
		searchTerm: string,
		page: number,
		pageSize: number,
	): Promise<{ items: Media[]; total: number }> {
		const offset = (page - 1) * pageSize;

		const searchPattern = `%${searchTerm}%`;

		const totalResult = await db
			.select({ count: sql<number>`COUNT(*)` })
			.from(mediaSchema)
			.where(
				or(
					ilike(mediaSchema.name, searchPattern),
					sql`EXISTS (
							SELECT 1
							FROM jsonb_array_elements_text(${mediaSchema.actors}) AS actor
							WHERE actor ILIKE ${searchPattern}
					)`,
					ilike(mediaSchema.director, searchPattern),
				),
			);

		const total = Number(totalResult[0]?.count) || 0;

		const query = await db
			.select()
			.from(mediaSchema)
			.where(
				or(
					ilike(mediaSchema.name, searchPattern),
					sql`EXISTS (
							SELECT 1
							FROM jsonb_array_elements_text(${mediaSchema.actors}) AS actor
							WHERE actor ILIKE ${searchPattern}
					)`,
					ilike(mediaSchema.director, searchPattern),
				),
			)
			.limit(pageSize)
			.offset(offset);

		const items: Media[] = query.map((item) => ({
			...item,
			actors: item.actors
				? (item.actors as unknown as string[]).map(String)
				: [],
			categories: item.categories
				? (item.categories as unknown as string[]).map(String)
				: [],
			awards: item.awards
				? (item.awards as unknown as string[]).map(String)
				: [],
			type: item.type as MediaType,
		}));

		return { items, total };
	}

	async findById(id: string): Promise<Media | null> {
		const result = await db
			.select()
			.from(mediaSchema)
			.where(eq(mediaSchema.id, id))
			.limit(1);

		if (!result.length) {
			return null;
		}

		const item = result[0];

		return {
			...item,
			actors: item.actors
				? (item.actors as unknown as string[]).map(String)
				: [],
			categories: item.categories
				? (item.categories as unknown as string[]).map(String)
				: [],
			awards: item.awards
				? (item.awards as unknown as string[]).map(String)
				: [],
			type: item.type as MediaType,
		};
	}
}
