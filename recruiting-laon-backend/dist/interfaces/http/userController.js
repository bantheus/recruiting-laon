"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const zod_1 = __importDefault(require("zod"));
const createUser_1 = require("../../application/user/createUser");
const loginUser_1 = require("../../application/user/loginUser");
const userRepository_1 = require("../../infrastructure/repository/userRepository");
const userRoutes = async (app, _opts) => {
    const userRepository = new userRepository_1.UserRepository();
    const createUser = new createUser_1.CreateUser(userRepository);
    const loginUser = new loginUser_1.LoginUser(userRepository);
    app.post("/signup", {
        schema: {
            body: zod_1.default.object({
                name: zod_1.default.string(),
                email: zod_1.default.string().email({ message: "O email deve ser válido." }),
                password: zod_1.default
                    .string()
                    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
            }),
        },
    }, async (request, reply) => {
        const { name, email, password } = request.body;
        try {
            const user = await createUser.execute({ name, email, password });
            reply.code(201).send(user);
        }
        catch (error) {
            reply.status(400).send({
                error: error instanceof Error ? error.message : "Erro interno do servidor",
            });
        }
    });
    app.post("/login", {
        schema: {
            body: zod_1.default.object({
                email: zod_1.default.string().email({ message: "O email deve ser válido." }),
                password: zod_1.default
                    .string()
                    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
            }),
        },
    }, async (request, reply) => {
        const { email, password } = request.body;
        try {
            const { token } = await loginUser.execute(email, password);
            reply.send({ token });
        }
        catch (error) {
            reply.status(401).send({
                error: error instanceof Error ? error.message : "Erro interno do servidor",
            });
        }
    });
};
exports.userRoutes = userRoutes;
