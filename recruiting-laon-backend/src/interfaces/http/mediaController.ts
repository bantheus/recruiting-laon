import { CreateMedia } from "@/application/media/createMedia";
import { FindMedia } from "@/application/media/findMedia";
import { MediaType } from "@/domain/media/media";
import { MediaRepository } from "@/infrastructure/repository/mediaRepository";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const mediaRoutes: FastifyPluginAsyncZod = async (app, _opts) => {
	const mediaRepository = new MediaRepository();

	const createMedia = new CreateMedia(mediaRepository);
	const findMedia = new FindMedia(mediaRepository);

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
					page: z.number().default(1),
					limit: z.number().default(10),
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
};
