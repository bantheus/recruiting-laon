import AuthHeader from "@/app/components/auth-header";
import Footer from "@/app/components/footer";
import Separator from "@/app/components/separator";
import type { MediaItem } from "@/types/media";
import Image from "next/image";
import { notFound } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

async function fetchMediaById(id: string): Promise<MediaItem | null> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			cache: "no-store",
		});

		if (!res.ok) {
			return null;
		}

		const media = await res.json();
		return media as MediaItem;
	} catch {
		return null;
	}
}

export default async function MediaPage({
	params,
}: { params: { id: string } }) {
	const media = await fetchMediaById(params.id);

	if (!media) {
		notFound();
	}

	return (
		<>
			<AuthHeader />
			<div className="relative h-[513px] lg:hidden">
				<Image
					src={media.coverLink}
					alt={media.name}
					fill
					quality={100}
					priority
					draggable={false}
					className="absolute top-0 left-0 w-full object-cover h-full -z-10 object-top"
				/>

				<div className="h-full absolute top-0 left-0 w-full bg-gradient-to-t from-background to-background-0" />
			</div>
			<main className="bg-background text-gray-500 pb-16">
				<div className="px-5 lg:px-28 flex flex-col lg:flex-row lg:pt-14 lg:gap-20">
					<div className="relative min-w-[306px] h-[448px] shadow-md hidden lg:flex">
						<Image
							src={media.coverLink}
							alt={media.name}
							fill
							quality={100}
							className="absolute w-full h-full top-0 left-0 object-cover object-top"
						/>
					</div>
					<div>
						<h1 className="font-semibold text-2xl lg:text-4xl text-white">
							{media.name}
						</h1>

						<div className="flex flex-col gap-1">
							<p className="mt-4">
								<strong>Título Original:</strong> {media.originalName}
							</p>
							<p>
								<strong>Ano:</strong> {media.releaseYear}
							</p>
							<p>
								<strong>Duração:</strong> {media.duration}min
							</p>
						</div>

						<div className="flex flex-wrap gap-2 mt-3">
							{media.categories.map((category) => (
								<span
									className="border whitespace-nowrapp border-gray-300 text-white rounded-full py-2 px-3 text-sm"
									key={uuidv4()}
								>
									{category}
								</span>
							))}
						</div>

						<h2 className="text-white font-semibold mt-8">Sinopse</h2>

						<Separator />

						<p className="mt-4">{media.description}</p>

						<div className="flex flex-col lg:flex-row w-full lg:gap-6">
							<div className="lg:w-1/2">
								<h2 className="text-white font-semibold mt-8">Elenco</h2>

								<Separator />

								<div className="flex gap-2 flex-wrap mt-4">
									{media.actors.map((actor, index) => (
										<span
											className="whitespace-nowrap text-sm lg:text-base"
											key={uuidv4()}
										>
											{actor}
											{index < media.actors.length - 1 && ","}
										</span>
									))}
								</div>
							</div>

							<div className="lg:w-1/2">
								<h2 className="text-white font-semibold mt-8">Prêmios</h2>

								<Separator />

								<div className="flex flex-wrap gap-2 mt-4">
									{media.awards.map((award, index) => (
										<span className=" text-sm lg:text-base" key={uuidv4()}>
											{award}
											{index < media.awards.length - 1 && ","}
										</span>
									))}
								</div>
							</div>
						</div>

						<div className="flex flex-col lg:flex-row w-full lg:gap-6">
							<div className="lg:w-1/2">
								<h2 className="text-white font-semibold mt-8">Diretor</h2>

								<Separator />

								<p className="mt-4">{media.director}</p>
							</div>

							<div className="lg:w-1/2">
								<h2 className="text-white font-semibold mt-8">Avaliações</h2>

								<Separator />

								<p className="mt-4">
									<strong>IMDb:</strong> {media.rating}
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
