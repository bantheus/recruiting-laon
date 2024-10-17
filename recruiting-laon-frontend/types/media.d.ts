export interface MediaItem {
	id: string;
	name: string;
	originalName: string;
	duration: number;
	releaseYear: number;
	actors: string[];
	categories: string[];
	type: "filme" | "série";
	description: string;
	director: string;
	awards: string[];
	rating: number;
	coverLink: string;
	trailerLink: string;
}

export interface MediaResponse {
	items: MediaItem[];
	total: number;
}
