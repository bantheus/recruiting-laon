import "fastify";
import type { JwtPayload } from "jsonwebtoken";

declare module "fastify" {
	interface FastifyRequest {
		user?: string | JwtPayload;
	}
}
