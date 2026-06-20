import { t } from "elysia";
import z from "zod";

export const GamesModel = {
    GamesReponse: z.array(
        z.object({
            id: z.number(),
            userId: z.string(),
            title: z.string(),
            imageUrl: z.url(),
            createdAt: z.string(),
        }),
    ),
    GamesGetResponse: z.object({
        games: z.array(
            z.object({
                id: z.number(),
                userId: z.string(),
                title: z.string(),
                imageUrl: z.url(),
                createdAt: z.string(),
            }),
        ),
        gamesTotal: z.number(),
        charactersTotal: z.number(),
        teamsTotal: z.number(),
    }),
    GamesInsert: z.object({
        title: z.string(),
        imageUrl: z.url(),
    }),
    GamesUpdate: z
        .object({
            title: z.string(),
            imageUrl: z.url(),
        })
        .partial()
        .refine((data) => Object.keys(data).length > 0, {
            message: "Debe enviar al menos un campo para actualizar",
        }),
    Params: t.Object({
        id: t.Number(),
    }),
};
