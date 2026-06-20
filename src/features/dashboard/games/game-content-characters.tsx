import { Button } from "@/components/ui/button";
import GameCharacter from "./game-characters";
import { app } from "@/elysia/client";
import { headers } from "next/headers";

export default async function GameContentCharacters({
    gameId,
}: {
    gameId: number;
}) {
    const characters = await app.api.characters.get({
        headers: await headers(),
        query: {
            gameId,
        },
    });
    if (characters.error) return <h1>Error</h1>;
    return (
        <div>
            <div>
                {/*Dissable = a selecionado*/}
                <Button variant="outline" disabled className="">
                    Todos
                </Button>
                <Button variant="outline">Dps</Button>
                <Button variant="outline">Sub-Dps</Button>
                <Button variant="outline">Tank</Button>
                <Button variant="outline">Support</Button>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {characters.data.map((c) => (
                    <GameCharacter key={c.id} character={c} />
                ))}
            </div>
        </div>
    );
}
