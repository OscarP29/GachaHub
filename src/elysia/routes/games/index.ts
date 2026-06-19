import { Elysia } from "elysia";
import { GamesService } from "./service";
import { GamesModel } from "./models";
import { betterAuthMiddleware } from "@/elysia/better-auth-middleware";
import { errorHandler } from "@/elysia/error-handler";

export const games = new Elysia({ prefix: "/games" })
    .use(betterAuthMiddleware)
    .use(errorHandler)
    .decorate("gamesService", GamesService)
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
