"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = exports.MediaType = void 0;
var MediaType;
(function (MediaType) {
    MediaType["MOVIE"] = "filme";
    MediaType["SERIES"] = "s\u00E9rie";
})(MediaType || (exports.MediaType = MediaType = {}));
class Media {
    id;
    name;
    originalName;
    duration;
    releaseYear;
    actors;
    categories;
    type;
    description;
    director;
    awards;
    rating;
    coverLink;
    trailerLink;
    constructor(id, name, originalName, duration, releaseYear, actors, categories, type, description, director, awards, rating, coverLink, trailerLink) {
        this.id = id;
        this.name = name;
        this.originalName = originalName;
        this.duration = duration;
        this.releaseYear = releaseYear;
        this.actors = actors;
        this.categories = categories;
        this.type = type;
        this.description = description;
        this.director = director;
        this.awards = awards;
        this.rating = rating;
        this.coverLink = coverLink;
        this.trailerLink = trailerLink;
    }
}
exports.Media = Media;
