import { env } from "@/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { Pool } from "pg";
import * as schema from "./schema";

export const client = new Pool({
	connectionString: env.DATABASE_URL,
});
export const db = drizzle(client, { schema, logger: true });
