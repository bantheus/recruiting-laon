"use client";

import { LogOut, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const AuthHeader = () => {
	const router = useRouter();

	const handleLogout = async () => {
		const response = await fetch("/api/logout", { method: "POST" });

		if (response.ok) {
			router.push("/login");
		} else {
			console.error("Logout failed");
		}
	};

	return (
		<header className="bg-background p-5 border-b border-gray-300 flex items-center justify-between">
			<Link href="/">
				<Image
					src="/logo.png"
					alt="Laon streaming"
					width={132}
					height={40}
					quality={100}
					priority
					className="object-contain"
				/>
			</Link>

			<DropdownMenu>
				<DropdownMenuTrigger
					asChild
					className="bg-gray-400 rounded-full size-7 p-1"
				>
					<User2Icon className="text-gray-100" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="bg-gray-300 border-gray-200 mr-2">
					<ul className="text-white">
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<li className="py-1 px-2 flex items-center" onClick={handleLogout}>
							<LogOut className="mr-2 size-4" />
							Sair
						</li>
					</ul>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};

export default AuthHeader;
