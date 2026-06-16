import { Elysia } from "elysia";
import { gamesService } from "./service";
import { GamesModel } from "./models";
import { betterAuthMiddleware } from "@/elysia/better-auth-middleware";

export const games = new Elysia({ prefix: "/games" })
    .use(betterAuthMiddleware)
    .decorate("gamesService", gamesService)
    .onError(({ code, error, set, status }) => {
        if (code === "VALIDATION") {
            set.status = 400;
            return {
                errors: error.all.map((issue) => ({
                    field: issue.path,
                    message: issue.message,
                })),
            };
        }

        if (error instanceof Error) {
            if (error.message === "INVALID_USER") {
                return status(400);
            }
        }

        return ((set.status = 500), { message: "Oops! Something broke." });
    })
    .get(
        "/",
        async ({ gamesService, user }) => {
            const games = await gamesService.getGames(user.id);
            return games;
        },
        { auth: true, response: GamesModel.GamesReponse },
    )
    .get(
        "/:id",
        async ({ gamesService, params: { id }, user }) => {
            const game = await gamesService.getGame(id, user.id);
            return game;
        },
        {
            auth: true,
            params: GamesModel.Params,
            response: GamesModel.GamesReponse,
        },
    )
    .post(
        "/",
        async ({ gamesService, body, user }) => {
            const game = gamesService.createGame(body, user.id);
            return game;
        },
        {
            auth: true,
            body: GamesModel.GamesInsert,
            response: GamesModel.GamesReponse,
        },
    )
    .patch(
        "/:id",
        async ({ gamesService, body, params: { id }, user }) => {
            const game = gamesService.updateGame(body, id, user.id);
            return game;
        },
        {
            auth: true,
            body: GamesModel.GamesUpdate,
            params: GamesModel.Params,
            response: GamesModel.GamesReponse,
        },
    )
    .delete(
        "/:id",
        async ({ gamesService, params: { id }, user }) => {
            const game = gamesService.deleteGame(id, user.id);
            return game;
        },
        {
            auth: true,
            params: GamesModel.Params,
            response: GamesModel.GamesReponse,
        },
    );
