import { auth } from "@/lib/auth";
import { type Context, Elysia } from "elysia";

const betterAuthService = async (context: Context) => {
    const METHOD = ["GET", "POST"];
    if (METHOD.includes(context.request.method)) {
        return await auth.handler(context.request);
    } else {
        return new Response("Method Not Allowed", { status: 405 });
    }
};

export const betterAuthEndpoint = new Elysia({ prefix: "/auth" }).all(
    "/*",
    betterAuthService,
);
