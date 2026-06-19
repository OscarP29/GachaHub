import { db } from "@/db";
import { characters } from "@/db/schema";
import { and, DrizzleQueryError, eq, ilike } from "drizzle-orm";
import z from "zod";
import { CharactersModel } from "./models";
import { DatabaseError } from "@neondatabase/serverless";

export const CharacterService = {
    async getCharacters(gameId: number, userId: string, search?: string) {
        if (search) {
            const character = await db
                .select()
                .from(characters)
                .where(
                    and(
                        and(
                            eq(characters.gameId, gameId),
                            and(
                                eq(characters.userId, userId),
                                ilike(characters.name, `${search}%`),
                            ),
                        ),
                    ),
                );
            return character.map((c) => ({
                ...c,
                createdAt: c.createdAt.toISOString(),
            }));
        }
        const character = await db
            .select()
            .from(characters)
            .where(
                and(
                    eq(characters.gameId, gameId),
                    eq(characters.userId, userId),
                ),
            );
        return character.map((c) => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
        }));
    },

    async createCharacter(
        data: z.infer<typeof CharactersModel.CharactersInsert>,
        userId: string,
    ) {
        try {
            const character = await db
                .insert(characters)
                .values({ ...data, userId })
                .returning();

            return character.map((c) => ({
                ...c,
                createdAt: c.createdAt.toISOString(),
            }));
        } catch (error) {
            if (error instanceof DrizzleQueryError) {
                if (error.cause instanceof DatabaseError) {
                    if (error.cause.code === "23503") {
                        throw new Error("INVALID_USER");
                    }
                }
                // ...
            }
            throw error;
        }
    },
    async updateCharacter(
        data: z.infer<typeof CharactersModel.CharactersUpdate>,
        id: number,
        userId: string,
    ) {
        const character = await db
            .update(characters)
            .set(data)
            .where(and(eq(characters.userId, userId), eq(characters.id, id)))
            .returning();
        return character.map((c) => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
        }));
    },
    async deleteCharacter(id: number, userId: string) {
        const character = await db
            .delete(characters)
            .where(and(eq(characters.userId, userId), eq(characters.id, id)))
            .returning();
        return character.map((c) => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
        }));
    },
};
