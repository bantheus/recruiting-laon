"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaRoutes = void 0;
const zod_1 = __importDefault(require("zod"));
const createMedia_1 = require("../../application/media/createMedia");
const findMedia_1 = require("../../application/media/findMedia");
const media_1 = require("../../domain/media/media");
const mediaRepository_1 = require("../../infrastructure/repository/mediaRepository");
const mediaRoutes = async (app, _opts) => {
    const mediaRepository = new mediaRepository_1.MediaRepository();
    const createMedia = new createMedia_1.CreateMedia(mediaRepository);
    const findMedia = new findMedia_1.FindMedia(mediaRepository);
    app.post("/media", {
        schema: {
            body: zod_1.default.object({
                name: zod_1.default.string(),
                originalName: zod_1.default.string(),
                duration: zod_1.default.number(),
                releaseYear: zod_1.default.number(),
                actors: zod_1.default.array(zod_1.default.string()),
                categories: zod_1.default.array(zod_1.default.string()),
                type: zod_1.default.enum(["filme", "série"]),
                description: zod_1.default.string(),
                director: zod_1.default.string(),
                awards: zod_1.default.array(zod_1.default.string()),
                rating: zod_1.default.number(),
                coverLink: zod_1.default.string(),
                trailerLink: zod_1.default.string(),
            }),
        },
    }, async (request, reply) => {
        const mediaData = request.body;
        const mediaType = mediaData.type === "filme" ? media_1.MediaType.MOVIE : media_1.MediaType.SERIES;
        try {
            const media = await createMedia.execute({
                ...mediaData,
                type: mediaType,
            });
            reply.code(201).send(media);
        }
        catch (error) {
            reply.status(400).send({
                error: error instanceof Error ? error.message : "Erro interno do servidor",
            });
        }
    });
    app.get("/search", {
        schema: {
            querystring: zod_1.default.object({
                searchTerm: zod_1.default.string(),
                page: zod_1.default.number().default(1),
                limit: zod_1.default.number().default(10),
            }),
        },
    }, async (request, reply) => {
        const { searchTerm, page, limit } = request.query;
        try {
            const result = await findMedia.execute({ searchTerm, page, limit });
            reply.code(200).send(result);
        }
        catch (error) {
            reply.status(400).send({
                error: error instanceof Error ? error.message : "Erro interno do servidor",
            });
        }
    });
};
exports.mediaRoutes = mediaRoutes;
