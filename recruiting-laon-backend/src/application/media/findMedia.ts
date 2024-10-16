import type { Media } from "../../domain/media/media";
import type { IMediaRepository } from "../../domain/media/repository/IMediaRepository";

export class FindMedia {
	constructor(private mediaRepository: IMediaRepository) {}

	async execute({
		searchTerm,
		page = 1,
		limit = 10,
	}: { searchTerm: string; page?: number; limit?: number }): Promise<{
		items: Media[];
		total: number;
	}> {
		return this.mediaRepository.findBySearchTerm(searchTerm, page, limit);
	}
}
