import type { Media } from "../../domain/media/media";
import type { IMediaRepository } from "../../domain/media/repository/IMediaRepository";

export class FindMediaById {
	constructor(private mediaRepository: IMediaRepository) {}

	async execute(id: string): Promise<Media | null> {
		return this.mediaRepository.findById(id);
	}
}
