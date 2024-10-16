"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(error, _request, reply) {
    if (error.validation) {
        const formatedErrors = error.validation.map((err) => {
            return {
                field: err.instancePath || err.params.missingProperty,
                message: err.message,
            };
        });
        reply.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: "Erro de validação.",
            errors: formatedErrors,
        });
    }
    else {
        reply.status(error.statusCode || 500).send({
            statusCode: error.statusCode || 500,
            error: error.name,
            message: error.message || "Erro interno do servidor.",
        });
    }
}
