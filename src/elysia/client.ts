import { Api } from "@/app/api/[[...slugs]]/route";
import { env } from "@/env";
import { treaty } from "@elysia/eden";

export const app = treaty<Api>(env.NEXT_PUBLIC_BETTER_AUTH_URL);
