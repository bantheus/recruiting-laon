"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const bcrypt_1 = require("../../infrastructure/security/bcrypt");
const jwt_1 = require("../../infrastructure/security/jwt");
class LoginUser {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email, password) {
        const user = await this.userRepository.findByEmailWithPassword(email);
        if (!user) {
            throw new Error("Credenciais inválidas");
        }
        const isPasswordValid = await (0, bcrypt_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Credenciais inválidas");
        }
        const token = (0, jwt_1.generateToken)(user.id);
        return { token };
    }
}
exports.LoginUser = LoginUser;
