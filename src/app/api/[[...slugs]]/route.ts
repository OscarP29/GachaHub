import { betterAuthEndpoint } from "@/elysia/routes/auth/better-auth";
import { games } from "@/elysia/routes/games/index";
import { Elysia } from "elysia";

const api = new Elysia({ prefix: "/api" }).use(betterAuthEndpoint).use(games);

export type Api = typeof api;
export const GET = api.fetch;
export const POST = api.fetch;
export const PATCH = api.fetch;
export const DELETE = api.fetch;
