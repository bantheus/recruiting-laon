import { env } from "@/env";
import jwt from "jsonwebtoken";

export function generateToken(userId: string): string {
	return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "1h" });
}
