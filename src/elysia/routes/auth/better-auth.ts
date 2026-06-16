import { auth } from "@/lib/auth";
import { type Context, Elysia } from "elysia";

const betterAuthService = async (context: Context) => {
    const METHOD = ["GET", "POST"];
    if (METHOD.includes(context.request.method)) {
        return auth.handler(context.request);
    } else {
        context.status("Method Not Allowed");
    }
};

export const betterAuthEndpoint = new Elysia({ prefix: "/auth" }).all(
    "/*",
    betterAuthService,
);
