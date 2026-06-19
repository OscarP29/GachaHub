import { betterAuthMiddleware } from "@/elysia/better-auth-middleware";
import { Elysia } from "elysia";
import { CharactersModel } from "./models";
import { CharacterService } from "./service";
import { errorHandler } from "@/elysia/error-handler";

export const characters = new Elysia({ prefix: "characters" })
    .use(betterAuthMiddleware)
    .decorate("characterService", CharacterService)
    .use(errorHandler)
    .get(
        "/",
        async ({ query: { search, gameId }, user, characterService }) => {
            const characters = await characterService.getCharacters(
                gameId,
                user.id,
                search,
            );
            return characters;
        },
        {
            auth: true,
            response: CharactersModel.CharactersResponse,
            query: CharactersModel.Query,
        },
    )
    .post(
        "/",

        async ({ user, characterService, body }) => {
            const character = await characterService.createCharacter(
                body,
                user.id,
            );
            return character;
        },
        {
            auth: true,
            body: CharactersModel.CharactersInsert,
            response: CharactersModel.CharactersResponse,
        },
    )
    .patch(
        "/:id",
        async ({
            params: { id },

            user,
            characterService,
            body,
        }) => {
            const character = await characterService.updateCharacter(
                body,
                id,
                user.id,
            );
            return character;
        },
        {
            auth: true,
            response: CharactersModel.CharactersResponse,
            body: CharactersModel.CharactersUpdate,
            params: CharactersModel.Params,
        },
    )
    .delete(
        "/:id",
        async ({ params: { id }, user, characterService }) => {
            const character = await characterService.deleteCharacter(
                id,
                user.id,
            );
            return character;
        },
        {
            auth: true,
            response: CharactersModel.CharactersResponse,
            params: CharactersModel.Params,
        },
    );
