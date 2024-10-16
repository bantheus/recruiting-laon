"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const drizzle_orm_1 = require("drizzle-orm");
const connection_1 = require("../database/connection");
const schema_1 = require("../database/schema");
class UserRepository {
    async create(user) {
        await connection_1.db.insert(schema_1.user).values({
            id: (0, cuid2_1.createId)(),
            name: user.name,
            email: user.email,
            password: user.password,
        });
        return user;
    }
    async findByEmail(email) {
        const result = await connection_1.db
            .select()
            .from(schema_1.user)
            .where((0, drizzle_orm_1.eq)(schema_1.user.email, email));
        if (result.length > 0) {
            const userData = result[0];
            return {
                id: userData.id,
                name: userData.name,
                email: userData.email,
            };
        }
        return null;
    }
    async findByEmailWithPassword(email) {
        const result = await connection_1.db
            .select({
            id: schema_1.user.id,
            name: schema_1.user.name,
            email: schema_1.user.email,
            password: schema_1.user.password,
        })
            .from(schema_1.user)
            .where((0, drizzle_orm_1.eq)(schema_1.user.email, email));
        if (result.length > 0) {
            const userData = result[0];
            return {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                password: userData.password,
            };
        }
        return null;
    }
}
exports.UserRepository = UserRepository;
