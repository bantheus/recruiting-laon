export enum MediaType {
	MOVIE = "filme",
	SERIES = "série",
}

export class Media {
	constructor(
		public id: string,
		public name: string,
		public originalName: string,
		public duration: number,
		public releaseYear: number,
		public actors: string[],
		public categories: string[],
		public type: MediaType,
		public description: string,
		public director: string,
		public awards: string[],
		public rating: number,
		public coverLink: string,
		public trailerLink: string,
	) {}
}
