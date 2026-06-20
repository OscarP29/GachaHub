import GameCardCreate from "./game-card-create";
import GameCard from "./game-card";

export default async function GamesContainer({
    dataGames,
}: {
    dataGames: {
        id: number;
        userId: string;
        title: string;
        imageUrl: string;
        createdAt: string;
    }[];
}) {
    return (
        <div className="grid grid-cols-4 gap-4">
            {dataGames?.map((g) => (
                <GameCard key={g.id} {...g} />
            ))}
            <GameCardCreate />
        </div>
    );
}
