import { createId } from "@paralleldrive/cuid2";
import type { IUserRepository } from "../../domain/user/repository/IUserRepository";
import { User } from "../../domain/user/user";
import { hashPassword } from "../../infrastructure/security/bcrypt";

export class CreateUser {
	constructor(private userRepository: IUserRepository) {}

	async execute(userData: Omit<User, "id">): Promise<Omit<User, "password">> {
		const existingUser = await this.userRepository.findByEmail(userData.email);
		if (existingUser) {
			throw new Error("Este email já está em uso.");
		}

		const hashedPassword = await hashPassword(userData.password);

		const userId = createId();

		const user = new User(
			userId,
			userData.name,
			userData.email,
			hashedPassword,
		);
		await this.userRepository.create(user);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
		};
	}
}
