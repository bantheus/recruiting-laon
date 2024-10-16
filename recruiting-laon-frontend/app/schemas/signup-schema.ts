import { z } from "zod";

export const signupSchema = z.object({
	name: z
		.string()
		.min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
	email: z.string().email({ message: "Email inválido." }),
	password: z
		.string()
		.min(6, { message: "A senha deve ter pelo menos 8 caracteres." }),
});

export type SignupSchema = z.infer<typeof signupSchema>;
