import Elysia from "elysia";

export const errorHandler = new Elysia().onError(
    ({ code, error, set, status }) => {
        if (code === "VALIDATION") {
            set.status = 400;
            return {
                errors: error.all.map((issue) => ({
                    field: issue.path,
                    message: issue.message,
                })),
            };
        }

        if (error instanceof Error) {
            if (error.message === "INVALID_USER") {
                return status(400);
            }
        }

        return ((set.status = 500), { message: "Oops! Something broke." });
    },
);
