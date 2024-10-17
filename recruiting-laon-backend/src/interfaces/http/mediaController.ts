import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { CreateMedia } from "../../application/media/createMedia";
import { FindMedia } from "../../application/media/findMedia";
import { FindMediaById } from "../../application/media/findMediaById";
import { MediaType } from "../../domain/media/media";
import { MediaRepository } from "../../infrastructure/repository/mediaRepository";

export const mediaRoutes: FastifyPluginAsyncZod = async (app, _opts) => {
	const mediaRepository = new MediaRepository();

	const createMedia = new CreateMedia(mediaRepository);
	const findMedia = new FindMedia(mediaRepository);
	const findMediaById = new FindMediaById(mediaRepository);

	app.post(
		"/media",
		{
			schema: {
				body: z.object({
					name: z.string(),
					originalName: z.string(),
					duration: z.number(),
					releaseYear: z.number(),
					actors: z.array(z.string()),
					categories: z.array(z.string()),
					type: z.enum(["filme", "série"]),
					description: z.string(),
					director: z.string(),
					awards: z.array(z.string()),
					rating: z.number(),
					coverLink: z.string(),
					trailerLink: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const mediaData = request.body;

			const mediaType =
				mediaData.type === "filme" ? MediaType.MOVIE : MediaType.SERIES;

			try {
				const media = await createMedia.execute({
					...mediaData,
					type: mediaType,
				});
				reply.code(201).send(media);
			} catch (error) {
				reply.status(400).send({
					error:
						error instanceof Error ? error.message : "Erro interno do servidor",
				});
			}
		},
	);

	app.get(
		"/search",
		{
			schema: {
				querystring: z.object({
					searchTerm: z.string(),
					page: z.preprocess((val) => Number(val), z.number().default(1)),
					limit: z.preprocess((val) => Number(val), z.number().default(10)),
				}),
			},
		},
		async (request, reply) => {
			const { searchTerm, page, limit } = request.query;

			try {
				const result = await findMedia.execute({ searchTerm, page, limit });
				reply.code(200).send(result);
			} catch (error) {
				reply.status(400).send({
					error:
						error instanceof Error ? error.message : "Erro interno do servidor",
				});
			}
		},
	);

	app.get(
		"/media/:id",
		{
			schema: {
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			try {
				const media = await findMediaById.execute(id);

				if (!media) {
					return reply.status(404).send({ message: "Media not found" });
				}

				reply.code(200).send(media);
			} catch (error) {
				reply.status(400).send({
					error:
						error instanceof Error ? error.message : "Internal server error",
				});
			}
		},
	);
};
