"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindMedia = void 0;
class FindMedia {
    mediaRepository;
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async execute({ searchTerm, page = 1, limit = 10, }) {
        return this.mediaRepository.findBySearchTerm(searchTerm, page, limit);
    }
}
exports.FindMedia = FindMedia;
