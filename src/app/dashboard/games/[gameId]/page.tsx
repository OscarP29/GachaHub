import { app } from "@/elysia/client";
import GameContent from "@/features/dashboard/games/game-content";
import GameHeader from "@/features/dashboard/games/game-header";
import { headers } from "next/headers";

type PageProps = {
    params: Promise<{
        gameId: string;
    }>;
};

export default async function Page({ params }: PageProps) {
    const { gameId } = await params;
    const games = await app.api.games({ id: gameId }).get({
        headers: await headers(),
    });
    if (!games.data) {
        console.log(games.error);
        return <h1>Error</h1>;
    }
    return (
        <div className="w-full grid gap-2">
            <GameHeader
                game={games.data.games[0]}
                charactersTotal={games.data.charactersTotal}
                teamsTotal={games.data.teamsTotal}
            />
            <GameContent gameId={gameId} />
        </div>
    );
}
