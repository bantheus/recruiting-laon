import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/infrastructure/database/schema.ts",
	out: "./src/infrastructure/database/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
