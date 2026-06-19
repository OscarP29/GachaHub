import { db } from "@/db";
import { teamCategories } from "@/db/schema";
import z from "zod";
import { CategoriesModel } from "./models";
import { and, DrizzleQueryError, eq } from "drizzle-orm";
import { DatabaseError } from "@neondatabase/serverless";

export const CategoriesService = {
    async getCategories(gameId: number, userId: string) {
        const category = await db
            .select()
            .from(teamCategories)
            .where(
                and(
                    eq(teamCategories.gameId, gameId),
                    eq(teamCategories.userId, userId),
                ),
            );
        return category.map((c) => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
        }));
    },
    async createCategory(
        data: z.infer<typeof CategoriesModel.CategoriesInsert>,
        userId: string,
    ) {
        try {
            const category = await db
                .insert(teamCategories)
                .values({ ...data, userId })
                .returning();
            return category.map((c) => ({
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
    async updateCategory(
        data: z.infer<typeof CategoriesModel.CategoriesUpdate>,
        id: number,
        userId: string,
    ) {
        const category = await db
            .update(teamCategories)
            .set(data)
            .where(
                and(
                    eq(teamCategories.id, id),
                    eq(teamCategories.userId, userId),
                ),
            )
            .returning();
        return category.map((c) => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
        }));
    },
    async deleteCategory(id: number, userId: string) {
        const category = await db
            .delete(teamCategories)
            .where(
                and(
                    eq(teamCategories.id, id),
                    eq(teamCategories.userId, userId),
                ),
            )
            .returning();
        return category.map((c) => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
        }));
    },
};
