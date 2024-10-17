import { ComingSoon } from "./components/coming-soon";

export default function Home() {
	return (
		<main className="bg-background px-5 h-screen">
			<h3 className="font-semibold text-white">Em breve</h3>
			<div className="mt-3">
				<ComingSoon />
			</div>
		</main>
	);
}
