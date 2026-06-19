import { t } from "elysia";
import z from "zod";

export const CategoriesModel = {
    CategoriesResponse: z.array(
        z.object({
            id: z.number(),
            gameId: z.number(),
            userId: z.string(),
            name: z.string(),
            order: z.number().nullable(),
            createdAt: z.string(),
        }),
    ),
    CategoriesInsert: z.object({
        gameId: z.number(),
        name: z.string(),
        order: z.number(),
    }),
    CategoriesUpdate: z
        .object({
            name: z.string(),
            order: z.number(),
        })
        .partial()
        .refine((data) => Object.keys(data).length > 0, {
            message: "Debe enviar al menos un campo para actualizar",
        }),
    Params: t.Object({
        id: t.Number(),
    }),
    Query: t.Object({
        gameId: t.Number(),
    }),
};
