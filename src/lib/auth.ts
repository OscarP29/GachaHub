import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/db";
import { resend } from "./resend";
import EmailVerifyTemplate from "@/emails/email-verify-template";
import * as schema from "@/db/schema";
import { env } from "@/env";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: false,
        sendVerificationEmail: async ({ user, token, url }, request) => {
            void resend.emails.send({
                from: "onboarding@resend.dev",
                to: env.EMAIL_TEST,
                subject: "Verificar tu dirección de correo electrónico",
                react: EmailVerifyTemplate({ url }),
            });
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
});
