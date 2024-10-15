import type { Media } from "@/domain/media/media";
import type { IMediaRepository } from "@/domain/media/repository/IMediaRepository";
import { createId } from "@paralleldrive/cuid2";
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
			coverLink: media.coverImage,
			trailerLink: media.trailer,
		});

		return media;
	}
}
