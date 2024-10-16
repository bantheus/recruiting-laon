import { createId } from "@paralleldrive/cuid2";
import { Media } from "../../domain/media/media";
import type { IMediaRepository } from "../../domain/media/repository/IMediaRepository";

export class CreateMedia {
	constructor(private mediaRepository: IMediaRepository) {}

	async execute(mediaData: Omit<Media, "id">): Promise<Media> {
		const mediaId = createId();

		const media = new Media(
			mediaId,
			mediaData.name,
			mediaData.originalName,
			mediaData.duration,
			mediaData.releaseYear,
			mediaData.actors,
			mediaData.categories,
			mediaData.type,
			mediaData.description,
			mediaData.director,
			mediaData.awards,
			mediaData.rating,
			mediaData.coverLink,
			mediaData.trailerLink,
		);

		return this.mediaRepository.create(media);
	}
}
