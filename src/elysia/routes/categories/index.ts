import { betterAuthMiddleware } from "@/elysia/better-auth-middleware";
import { errorHandler } from "@/elysia/error-handler";
import { Elysia } from "elysia";
import { CategoriesModel } from "./models";
import { CategoriesService } from "./service";

export const category = new Elysia({ prefix: "categories" })
    .use(betterAuthMiddleware)
    .use(errorHandler)
    .decorate("categoriesService", CategoriesService)
    .get(
        "/",
        async ({ query: { gameId }, user, categoriesService }) => {
            const category = await categoriesService.getCategories(
                gameId,
                user.id,
            );
            return category;
        },
        {
            auth: true,
            response: CategoriesModel.CategoriesResponse,
            query: CategoriesModel.Query,
        },
    )
    .post(
        "/",
        async ({ body, user, categoriesService }) => {
            const category = await categoriesService.createCategory(
                body,
                user.id,
            );
            return category;
        },
        {
            auth: true,
            response: CategoriesModel.CategoriesResponse,
            body: CategoriesModel.CategoriesInsert,
        },
    )
    .patch(
        "/",
        async ({ body, params: { id }, user, categoriesService }) => {
            const category = await categoriesService.updateCategory(
                body,
                id,
                user.id,
            );
            return category;
        },
        {
            auth: true,
            response: CategoriesModel.CategoriesResponse,
            params: CategoriesModel.Params,
            body: CategoriesModel.CategoriesUpdate,
        },
    )
    .delete(
        "/",
        async ({ params: { id }, user, categoriesService }) => {
            const category = await categoriesService.deleteCategory(
                id,
                user.id,
            );
            return category;
        },
        {
            auth: true,
            response: CategoriesModel.CategoriesResponse,
            params: CategoriesModel.Params,
        },
    );
