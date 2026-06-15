import { betterAuthEndpoint } from "@/elysia/routes/auth/better-auth";
import { Elysia } from "elysia";

const api = new Elysia({ prefix: "/api" }).use(betterAuthEndpoint);

export const GET = api.fetch;
export const POST = api.fetch;
