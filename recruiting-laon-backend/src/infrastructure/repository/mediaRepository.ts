import type { Media } from "@/domain/media/media";

import type { IMediaRepository } from "@/domain/media/repository/IMediaRepository";
import { createId } from "@paralleldrive/cuid2";
import { eq, sql } from "drizzle-orm";
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

	async findByName(
		name: string,
		page: number,
		pageSize: number,
	): Promise<{ items: Media[]; total: number }> {
		const offset = (page - 1) * pageSize;

		const totalResult = await db
			.select({ count: sql`COUNT(*)` })
			.from(mediaSchema)
			.where(eq(mediaSchema.name, name));

		const total = totalResult[0]?.count || 0;

		const query = db
			.select()
			.from(mediaSchema)
			.where(eq(mediaSchema.name, name))
			.limit(pageSize)
			.offset(offset);

		const items = await query;

		return { items, total };
	}
}
