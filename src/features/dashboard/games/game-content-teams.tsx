import { app } from "@/elysia/client";
import GameCategoriesTeams from "./game-categories-teams";
import { headers } from "next/headers";

export default async function GameContentTeams({ gameId }: { gameId: number }) {
    const categories = await app.api.categories.get({
        headers: await headers(),
        query: { gameId },
    });
    if (categories.error) return <h1>Error</h1>;
    return (
        <div className="">
            {categories.data.map((c) => (
                <GameCategoriesTeams
                    key={c.id}
                    name={c.name}
                    gameid={gameId}
                    categoryId={c.id}
                />
            ))}
        </div>
    );
}
