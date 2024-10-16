import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { CreateUser } from "../../application/user/createUser";
import { LoginUser } from "../../application/user/loginUser";
import { UserRepository } from "../../infrastructure/repository/userRepository";

export const userRoutes: FastifyPluginAsyncZod = async (app, _opts) => {
	const userRepository = new UserRepository();

	const createUser = new CreateUser(userRepository);
	const loginUser = new LoginUser(userRepository);

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

	app.post(
		"/login",
		{
			schema: {
				body: z.object({
					email: z.string().email({ message: "O email deve ser válido." }),
					password: z
						.string()
						.min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
				}),
			},
		},
		async (request, reply) => {
			const { email, password } = request.body;

			try {
				const { token } = await loginUser.execute(email, password);
				reply.send({ token });
			} catch (error) {
				reply.status(401).send({
					error:
						error instanceof Error ? error.message : "Erro interno do servidor",
				});
			}
		},
	);
};
