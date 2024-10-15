import type { Media } from "../media";

export interface IMediaRepository {
	create(media: Media): Promise<Media>;
	findByName(
		name: string,
		page: number,
		pageSize: number,
	): Promise<{ items: Media[]; total: number }>;
}
