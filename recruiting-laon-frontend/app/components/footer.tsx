import { FacebookIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";

const Footer = () => {
	return (
		<footer className="bg-background flex-col md:flex-row gap-6 p-5 md:px-28 border-t border-gray-300 flex items-center justify-between">
			<Image
				src="/logo.png"
				alt="Laon streaming"
				width={132}
				height={40}
				quality={100}
				priority
				className="object-contain"
			/>

			<div className="flex gap-6 text-gray-500 text-xs md:text-base">
				<p>Termos e Condições</p>
				<p>Política de Privacidade</p>
				<p>Ajuda</p>
			</div>

			<div className="flex gap-6 text-gray-500">
				<FacebookIcon />
				<TwitterIcon />
				<YoutubeIcon />
			</div>
		</footer>
	);
};

export default Footer;
