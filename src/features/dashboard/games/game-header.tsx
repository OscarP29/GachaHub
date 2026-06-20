import patternBackground from "@/assets/pattern-background.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GameCardStats from "./game-card-stats";
import { EllipsisVertical } from "lucide-react";

interface GameHeaderProps {
    game: {
        id: number;
        userId: string;
        title: string;
        imageUrl: string;
    };
    charactersTotal: number;
    teamsTotal: number;
}
export default function GameHeader({
    game,
    charactersTotal,
    teamsTotal,
}: GameHeaderProps) {
    return (
        <main>
            <div className="relative w-full h-56">
                <img
                    src={patternBackground.src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover brightness-75"
                />
            </div>

            <div className="max-w-350 mx-auto  ">
                <div className="bg-background rounded-2xl border border-neutral-200 dark:border-neutral-700 -mt-16 relative z-10 p-5">
                    <EllipsisVertical className="absolute right-2 top-4 text-neutral-200" />
                    <div className="flex justify-center -mt-16 mb-3">
                        <Avatar className="w-50 h-50 border-4 border-white dark:border-neutral-800">
                            <AvatarImage src={game.imageUrl} />
                            <AvatarFallback>GM</AvatarFallback>
                        </Avatar>
                    </div>

                    <h1 className="text-2xl font-medium text-center leading-tight mb-4 capitalize">
                        {game.title}
                    </h1>

                    <div className="border-t border-neutral-200 dark:border-neutral-700 mb-3" />
                    <div className="grid grid-cols-2 gap-2 ">
                        <GameCardStats
                            title={charactersTotal.toString()}
                            description="Personajes"
                            icon="character"
                        />
                        <GameCardStats
                            title={teamsTotal.toString()}
                            description="Equipos"
                            icon="team"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
