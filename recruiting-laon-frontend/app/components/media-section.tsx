import type { MediaItem } from "@/types/media";
import { Suspense } from "react";
import { v4 as uuidv4 } from "uuid";
import MediaGrid from "./media-grid";
import { Skeleton } from "./ui/skeleton";

export const MediaSection = ({
	title,
	media,
}: { title: string; media: MediaItem[] }) => (
	<div>
		<h3 className="uppercase text text-gray-500 font-semibold my-6">{title}</h3>
		<Suspense
			fallback={
				<div className="grid grid-cols-2 gap-4">
					{Array.from({ length: 6 }).map(() => (
						<div key={uuidv4()} className="relative w-full h-[234px]">
							<Skeleton className="w-full h-full" />
						</div>
					))}
				</div>
			}
		>
			<MediaGrid media={media} />
		</Suspense>
	</div>
);
