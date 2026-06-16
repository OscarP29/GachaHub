import { env } from "@/env";
import { drizzle } from "drizzle-orm/neon-http";
// import { Pool } from "pg";
import * as schema from "./schema";
// const pool = new Pool({
//     connectionString: env.DATABASE_URL,
// });

export const db = drizzle(env.DATABASE_URL, { schema });
