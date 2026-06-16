import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/db";
import { resend } from "./resend";
import EmailVerifyTemplate from "@/emails/email-verify-template";
import * as schema from "@/db/schema";
import { env } from "@/env";
import EmailExistingAccountTemplate from "@/emails/email-existing-account-template";
import EmailResetPasswordTemplate from "@/emails/email-reset-password-template";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        revokeSessionsOnPasswordReset: true,
        sendResetPassword: async ({ user, url, token }, request) => {
            void resend.emails.send({
                from: "onboarding@resend.dev",
                to: env.EMAIL_TEST,
                subject: "Restablece tu contraseña",
                react: EmailResetPasswordTemplate({ url }),
            });
        },
        onExistingUserSignUp: async ({ user }) => {
            void resend.emails.send({
                from: "onboarding@resend.dev",
                to: env.EMAIL_TEST,
                subject: "Ya existe una cuenta en Gacha Hub",
                react: EmailExistingAccountTemplate({
                    url: `${env.DATABASE_URL}/login`,
                }),
            });
        },
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
    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIEND,
            clientSecret: env.GOOGLE_CLIEND_SECRET,
            accessType: "offline",
            prompt: "select_account consent",
        },
    },
    accountLinking: {
        enabled: true,
        trustedProviders: ["google"],
    },
});
