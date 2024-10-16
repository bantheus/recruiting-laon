"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const user_1 = require("../../domain/user/user");
const bcrypt_1 = require("../../infrastructure/security/bcrypt");
class CreateUser {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userData) {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error("Este email já está em uso.");
        }
        const hashedPassword = await (0, bcrypt_1.hashPassword)(userData.password);
        const userId = (0, cuid2_1.createId)();
        const user = new user_1.User(userId, userData.name, userData.email, hashedPassword);
        await this.userRepository.create(user);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}
exports.CreateUser = CreateUser;
