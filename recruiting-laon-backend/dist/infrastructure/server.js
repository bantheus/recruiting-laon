"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const mediaController_1 = require("../interfaces/http/mediaController");
const userController_1 = require("../interfaces/http/userController");
const errorHandler_1 = require("./errors/errorHandler");
async function createServer() {
    const app = (0, fastify_1.default)({ logger: true }).withTypeProvider();
    app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
    app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
    app.register(userController_1.userRoutes);
    app.register(mediaController_1.mediaRoutes);
    app.setErrorHandler(errorHandler_1.errorHandler);
    return app;
}
exports.default = createServer;
