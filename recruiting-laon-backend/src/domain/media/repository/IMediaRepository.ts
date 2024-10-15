import type { Media } from "../media";

export interface IMediaRepository {
	create(media: Media): Promise<Media>;
}
