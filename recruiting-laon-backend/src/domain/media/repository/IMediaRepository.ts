import type { Media } from "../media";

export interface IMediaRepository {
	create(media: Media): Promise<Media>;
	findBySearchTerm(
		searchTerm: string,
		page: number,
		pageSize: number,
	): Promise<{ items: Media[]; total: number }>;
	findById(id: string): Promise<Media | null>;
}
