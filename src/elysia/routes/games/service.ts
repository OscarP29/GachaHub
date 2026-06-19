import { db } from "@/db";
import { games } from "@/db/schema";
import { and, DrizzleQueryError, eq } from "drizzle-orm";
import z from "zod";
import { GamesModel } from "./models";
import { DatabaseError } from "pg";

export const GamesService = {
    async getGames(userId: string) {
        const game = await db
            .select()
            .from(games)
            .where(eq(games.userId, userId));
        return game.map((g) => ({
            ...g,
            createdAt: g.createdAt.toISOString(),
        }));
    },
    async getGame(id: number, userId: string) {
        const game = await db
            .select()
            .from(games)
            .where(and(eq(games.id, id), eq(games.userId, userId)));
        return game.map((g) => ({
            ...g,
            createdAt: g.createdAt.toISOString(),
        }));
    },
    /**Create new game */
    async createGame(
        data: z.infer<typeof GamesModel.GamesInsert>,
        userId: string,
    ) {
        try {
            const game = await db
                .insert(games)
                .values({ ...data, userId })
                .returning();
            return game.map((g) => ({
                ...g,
                createdAt: g.createdAt.toISOString(),
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
    async updateGame(
        data: z.infer<typeof GamesModel.GamesUpdate>,
        id: number,
        userId: string,
    ) {
        const game = await db
            .update(games)
            .set(data)
            .where(and(eq(games.id, id), eq(games.userId, userId)))
            .returning();
        return game.map((g) => ({
            ...g,
            createdAt: g.createdAt.toISOString(),
        }));
    },
    async deleteGame(id: number, userId: string) {
        const game = await db
            .delete(games)
            .where(and(eq(games.id, id), eq(games.userId, userId)))
            .returning();
        return game.map((g) => ({
            ...g,
            createdAt: g.createdAt.toISOString(),
        }));
    },
};
