import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import {
	type ZodTypeProvider,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { mediaRoutes } from "../interfaces/http/mediaController";
import { userRoutes } from "../interfaces/http/userController";
import { errorHandler } from "./errors/errorHandler";

async function createServer() {
	const app = fastify().withTypeProvider<ZodTypeProvider>();

	app.register(fastifyCors, {
		origin: "*",
	});

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.register(userRoutes);
	app.register(mediaRoutes);

	app.setErrorHandler(errorHandler);

	return app;
}

export default createServer;
