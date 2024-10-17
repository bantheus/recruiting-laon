"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/app/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { comingSoon } from "../constants/coming-soon";

export function ComingSoon() {
	return (
		<Carousel
			plugins={[
				Autoplay({
					delay: 5000,
				}),
			]}
			opts={{
				loop: true,
				align: "start",
			}}
			className="w-full"
		>
			<CarouselContent>
				{comingSoon.map((item) => (
					<CarouselItem key={item.id} className="basis-[90%]">
						<div className="">
							<div className="flex w-full h-[220px] items-center justify-center relative ">
								<Image
									src={item.image}
									alt={item.title}
									fill
									quality={100}
									priority
									className="object-cover absolute w-full h-full top-0 left-0 object-left"
								/>
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
