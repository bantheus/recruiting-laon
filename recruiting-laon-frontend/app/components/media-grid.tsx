import type { MediaItem } from "@/types/media";
import Image from "next/image";
import Link from "next/link";

interface MediaGridProps {
	media: MediaItem[];
}

export default function MediaGrid({ media }: MediaGridProps) {
	return (
		<div className="grid grid-cols-2 gap-4">
			{media.slice(0, 6).map((item: MediaItem) => (
				<Link
					href={`/media/${item.id}`}
					key={item.id}
					className="relative w-full h-[234px]"
				>
					<Image
						src={item.coverLink}
						alt={item.name}
						fill
						quality={100}
						className="absolute w-full h-full top-0 left-0 object-cover"
					/>
				</Link>
			))}
		</div>
	);
}
