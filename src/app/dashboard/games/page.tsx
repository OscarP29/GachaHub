import { Input } from "@/components/ui/input";

import GameCardStats from "@/features/dashboard/games/game-card-stats";
import GamesContainer from "@/features/dashboard/games/games-container";
import { Search } from "lucide-react";

export default async function Page() {
    return (
        <div className="w-full">
            <div className="max-w-350 mx-auto py-4">
                <div className="grid grid-cols-4 gap-5">
                    <GameCardStats
                        description="Total de juegos"
                        title="250"
                        icon="controller"
                    />
                    <GameCardStats
                        description="Total de equipos"
                        title="250"
                        icon="team"
                    />
                    <GameCardStats
                        description="Total de notas"
                        title="250"
                        icon="note"
                    />
                    <GameCardStats
                        description="Total de personajes"
                        title="250"
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
                    <GamesContainer />
                </div>
            </div>
        </div>
    );
}
