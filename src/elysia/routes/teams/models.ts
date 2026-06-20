import { t } from "elysia";
import z from "zod";

export const TeamsModel = {
    TeamsResponse: z.object({
        id: z.number(),
        categoryId: z.number(),
        gameId: z.number(),
        userId: z.string(),
        title: z.string(),
        notes: z.string().optional(),
        createdAt: z.string(),
    }),
    TeamsInsert: z.object({
        categoryId: z.number(),
        gameId: z.number(),
        title: z.string(),
        notes: z.string().optional(),
    }),
    TeamsUpdate: z
        .object({
            title: z.string(),
            notes: z.string(),
        })
        .partial()
        .refine((data) => Object.keys(data).length > 0, {
            message: "Debe enviar al menos un campo para actualizar",
        }),
    params: t.Object({
        id: t.Number(),
    }),
};
