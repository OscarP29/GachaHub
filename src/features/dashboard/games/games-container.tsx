import React from "react";
import GameCardCreate from "./game-card-create";
import { app } from "@/elysia/client";
import GameCard from "./game-card";
import { headers } from "next/headers";

export default async function GamesContainer() {
    const { data: dataGames, error } = await app.api.games.get({
        headers: await headers(),
    });
    if (error) console.log(error);
    return (
        <div className="grid grid-cols-4 gap-4">
            {dataGames?.map((g) => (
                <GameCard key={g.id} {...g} />
            ))}
            <GameCardCreate />
        </div>
    );
}
