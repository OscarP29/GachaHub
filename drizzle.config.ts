import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
});
