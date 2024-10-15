import type { IUserRepository } from "@/domain/user/repository/IUserRepository";
import type { User } from "@/domain/user/user";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { db } from "../database/connection";
import { user as userSchema } from "../database/schema";

export class UserRepository implements IUserRepository {
	async create(user: User): Promise<Omit<User, "password">> {
		await db.insert(userSchema).values({
			id: createId(),
			name: user.name,
			email: user.email,
			password: user.password,
		});

		return user;
	}

	async findByEmail(email: string): Promise<Omit<User, "password"> | null> {
		const result = await db
			.select()
			.from(userSchema)
			.where(eq(userSchema.email, email));

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

	async findByEmailWithPassword(email: string): Promise<User | null> {
		const result = await db
			.select({
				id: userSchema.id,
				name: userSchema.name,
				email: userSchema.email,
				password: userSchema.password,
			})
			.from(userSchema)
			.where(eq(userSchema.email, email));

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
