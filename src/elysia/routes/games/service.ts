import { db } from "@/db";
import { characters, games, teams } from "@/db/schema";
import { and, count, DrizzleQueryError, eq } from "drizzle-orm";
import z from "zod";
import { GamesModel } from "./models";
import { DatabaseError } from "pg";

export const GamesService = {
    async getGames(userId: string) {
        const [game, countCharacters, countTeams] = await Promise.all([
            db.select().from(games).where(eq(games.userId, userId)),
            db
                .select({ count: count() })
                .from(characters)
                .where(eq(characters.userId, userId)),
            db
                .select({ count: count() })
                .from(teams)
                .where(eq(teams.userId, userId)),
        ]);
        return {
            games: game.map((g) => ({
                ...g,
                createdAt: g.createdAt.toISOString(),
            })),
            gamesTotal: game.length,
            charactersTotal: countCharacters[0].count,
            teamsTotal: countTeams[0].count,
        };
    },
    async getGame(id: number, userId: string) {
        const [game, countCharacters, countTeams] = await Promise.all([
            db
                .select()
                .from(games)
                .where(and(eq(games.id, id), eq(games.userId, userId))),
            db
                .select({ count: count() })
                .from(characters)
                .where(
                    and(
                        eq(characters.gameId, id),
                        eq(characters.userId, userId),
                    ),
                ),
            db
                .select({ count: count() })
                .from(teams)
                .where(and(eq(teams.gameId, id), eq(teams.userId, userId))),
        ]);

        return {
            games: game.map((g) => ({
                ...g,
                createdAt: g.createdAt.toISOString(),
            })),
            gamesTotal: game.length,
            charactersTotal: countCharacters[0].count,
            teamsTotal: countTeams[0].count,
        };
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
