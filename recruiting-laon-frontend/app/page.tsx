import type { MediaItem, MediaResponse } from "@/types/media";
import AuthHeader from "./components/auth-header";
import { ComingSoon } from "./components/coming-soon";
import Footer from "./components/footer";
import { MediaSection } from "./components/media-section";

async function fetchMedia(): Promise<MediaResponse> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search?searchTerm=&page=1&limit=100`,
		{
			method: "GET",
		},
	);

	if (!res.ok) {
		throw new Error("Erro ao buscar mídias");
	}

	return res.json() as Promise<MediaResponse>;
}

export default async function Home() {
	const mediaData = await fetchMedia();
	const movies = mediaData.items.filter(
		(item: MediaItem) => item.type === "filme",
	);
	const series = mediaData.items.filter(
		(item: MediaItem) => item.type === "série",
	);

	return (
		<>
			<AuthHeader />
			<main className="bg-background px-5 py-12 md:px-28">
				<h3 className="font-semibold text-white md:hidden">Em breve</h3>
				<div className="mt-3 md:hidden">
					<ComingSoon />
				</div>

				<h2 className="font-semibold text-2xl md:text-4xl text-white mt-10">
					Populares
				</h2>

				<MediaSection title="Filmes" media={movies} />
				<MediaSection title="Séries" media={series} />
			</main>
			<Footer />
		</>
	);
}
