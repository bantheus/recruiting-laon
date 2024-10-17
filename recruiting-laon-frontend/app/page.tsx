import type { MediaItem, MediaResponse } from "@/types/media";
import Image from "next/image";
import { ComingSoon } from "./components/coming-soon";

async function fetchMedia(): Promise<MediaResponse> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search?searchTerm=`,
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

	return (
		<main className="bg-background px-5">
			<h3 className="font-semibold text-white">Em breve</h3>
			<div className="mt-3">
				<ComingSoon />
			</div>

			<h2 className="font-semibold text-2xl text-white mt-10">Populares</h2>

			<h3 className="uppercase text text-gray-500 font-semibold my-6">
				Filmes
			</h3>

			<div className="grid grid-cols-2 gap-4">
				{movies.slice(0, 6).map((movie: MediaItem) => (
					<div key={movie.id} className="relative w-full h-[234px]">
						<Image
							src={movie.coverLink}
							alt={movie.name}
							fill
							quality={100}
							className="absolute w-full h-full top-0 left-0 object-cover"
						/>
					</div>
				))}
			</div>
		</main>
	);
}
