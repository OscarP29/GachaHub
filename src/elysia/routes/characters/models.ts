import { t } from "elysia";
import z from "zod";

const roles = ["dps", "sub_dps", "support", "tank"] as const;

export const CharactersModel = {
    CharactersResponse: z.array(
        z.object({
            id: z.number(),
            gameId: z.number(),
            userId: z.string(),
            name: z.string(),
            imageUrl: z.url(),
            role: z.enum(roles),
            rarity: z.string().nullable(),
            owned: z.boolean(),
            equipmentNotes: z.string().nullable(),
            createdAt: z.string(),
        }),
    ),
    CharactersInsert: z.object({
        gameId: z.number(),
        name: z.string(),
        imageUrl: z.url(),
        role: z.enum(roles),
        rarity: z.string().optional(),
        owned: z.boolean(),
        equipmentNotes: z.string().optional(),
    }),
    CharactersUpdate: z
        .object({
            name: z.string(),
            imageUrl: z.url(),
            role: z.enum(roles),
            rarity: z.string(),
            equipmentNotes: z.string(),
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
        search: t.Optional(t.String()),
    }),
};
