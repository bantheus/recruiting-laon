import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { name, email, password } = await req.json();

	if (!name || !email || !password) {
		return NextResponse.json(
			{ error: "Preencha todos os campos" },
			{ status: 400 },
		);
	}

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, password }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			return NextResponse.json(
				{ error: errorData.error || "Erro ao se cadastrar" },
				{ status: response.status },
			);
		}

		return NextResponse.json({
			success: true,
			message: "Cadastro realizado com sucesso!",
		});
	} catch (error) {
		console.error("Erro no servidor:", error);
		return NextResponse.json(
			{ error: "Erro ao conectar-se ao servidor." },
			{ status: 500 },
		);
	}
}
