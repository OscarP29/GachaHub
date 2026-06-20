import { Input } from "@/components/ui/input";
import { app } from "@/elysia/client";

import GameCardStats from "@/features/dashboard/games/game-card-stats";
import GamesContainer from "@/features/dashboard/games/games-container";
import { Search } from "lucide-react";
import { headers } from "next/headers";

export default async function Page() {
    const games = await app.api.games.get({
        headers: await headers(),
    });
    if (!games.data) {
        console.log(games.error);
        return <h1>Error</h1>;
    }
    return (
        <div className="w-full">
            <div className="max-w-350 mx-auto py-4">
                <div className="grid grid-cols-4 gap-5">
                    <GameCardStats
                        description="Total de juegos"
                        title={games.data.gamesTotal.toString()}
                        icon="controller"
                    />
                    <GameCardStats
                        description="Total de equipos"
                        title={games.data.teamsTotal.toString()}
                        icon="team"
                    />

                    <GameCardStats
                        description="Total de personajes"
                        title={games.data.charactersTotal.toString()}
                        icon="character"
                    />
                </div>
                <div>
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Mis Juegos</h3>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                            <Input
                                type="search"
                                placeholder="Buscar..."
                                className="pl-9"
                            />
                        </div>
                    </div>
                    <GamesContainer dataGames={games.data.games} />
                </div>
            </div>
        </div>
    );
}
