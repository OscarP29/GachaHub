import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.url(),
        UPLOADTHING_TOKEN: z.string(),

        BETTER_AUTH_SECRET: z.string(),
        RESEND_API_KEY: z.string(),
        EMAIL_TEST: z.email(),
    },
    client: {
        NEXT_PUBLIC_BETTER_AUTH_URL: z.url(),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    },
});
