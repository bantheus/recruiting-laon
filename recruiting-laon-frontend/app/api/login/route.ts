import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { email, password } = await req.json();

	if (!email || !password) {
		return NextResponse.json(
			{ error: "Preencha todos os campos" },
			{ status: 400 },
		);
	}

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			return NextResponse.json(
				{ error: errorData.error || "Erro ao fazer login" },
				{ status: 401 },
			);
		}

		const { token } = await response.json();

		const responseWithCookies = NextResponse.json({ success: true });
		responseWithCookies.cookies.set("token", token, { httpOnly: true });

		return responseWithCookies;
	} catch {
		return NextResponse.json(
			{ error: "Erro ao conectar-se ao servidor." },
			{ status: 500 },
		);
	}
}
