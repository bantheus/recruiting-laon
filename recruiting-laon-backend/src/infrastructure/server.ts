import { userRoutes } from "@/interfaces/http/userController";
import fastify from "fastify";
import {
	type ZodTypeProvider,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { errorHandler } from "./errors/errorHandler";

async function createServer() {
	const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.register(userRoutes);

	app.setErrorHandler(errorHandler);

	return app;
}

export default createServer;
