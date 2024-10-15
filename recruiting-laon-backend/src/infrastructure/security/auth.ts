import { env } from "@/env";
import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export async function verifyToken(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		return reply.status(401).send({ error: "Token não fornecido" });
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, env.JWT_SECRET);
		request.user = decoded;
	} catch (error) {
		return reply.status(401).send({ error: "Token inválido" });
	}
}
