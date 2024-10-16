import type { IUserRepository } from "../../domain/user/repository/IUserRepository";
import { comparePassword } from "../../infrastructure/security/bcrypt";
import { generateToken } from "../../infrastructure/security/jwt";

export class LoginUser {
	constructor(private userRepository: IUserRepository) {}

	async execute(email: string, password: string): Promise<{ token: string }> {
		const user = await this.userRepository.findByEmailWithPassword(email);
		if (!user) {
			throw new Error("Credenciais inválidas");
		}

		const isPasswordValid = await comparePassword(password, user.password);
		if (!isPasswordValid) {
			throw new Error("Credenciais inválidas");
		}

		const token = generateToken(user.id);

		return { token };
	}
}
