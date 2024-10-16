"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMedia = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const media_1 = require("../../domain/media/media");
class CreateMedia {
    mediaRepository;
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async execute(mediaData) {
        const mediaId = (0, cuid2_1.createId)();
        const media = new media_1.Media(mediaId, mediaData.name, mediaData.originalName, mediaData.duration, mediaData.releaseYear, mediaData.actors, mediaData.categories, mediaData.type, mediaData.description, mediaData.director, mediaData.awards, mediaData.rating, mediaData.coverLink, mediaData.trailerLink);
        return this.mediaRepository.create(media);
    }
}
exports.CreateMedia = CreateMedia;
