import { CreateUser } from "@/application/user/createUser";
import { UserRepository } from "@/infrastructure/repository/userRepository";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const userRoutes: FastifyPluginAsyncZod = async (app, _opts) => {
	const userRepository = new UserRepository();

	const createUser = new CreateUser(userRepository);

	app.post(
		"/signup",
		{
			schema: {
				body: z.object({
					name: z.string(),
					email: z.string().email({ message: "O email deve ser válido." }),
					password: z
						.string()
						.min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
				}),
			},
		},
		async (request, reply) => {
			const { name, email, password } = request.body;

			try {
				const user = await createUser.execute({ name, email, password });
				reply.code(201).send(user);
			} catch (error) {
				reply.status(400).send({
					error:
						error instanceof Error ? error.message : "Erro interno do servidor",
				});
			}
		},
	);
};
