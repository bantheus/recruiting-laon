import type { User } from "../user";

export interface IUserRepository {
	create(user: User): Promise<Omit<User, "password">>;
	findByEmail(email: string): Promise<Omit<User, "password"> | null>;
	findByEmailWithPassword(email: string): Promise<User | null>;
}
