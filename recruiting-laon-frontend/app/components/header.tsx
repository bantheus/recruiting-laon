import Image from "next/image";

const Header = () => {
	return (
		<header className="md:px-28 md:justify-center bg-background md:bg-gray-100 p-5 border-b border-gray-300 flex justify-end">
			<Image
				src="/logo.png"
				alt="Laon streaming"
				width={132}
				height={40}
				quality={100}
				priority
				className="object-contain"
			/>
		</header>
	);
};

export default Header;
