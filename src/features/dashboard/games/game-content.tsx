import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameContentCharacters from "./game-content-characters";
import GameContentTeams from "./game-content-teams";

export default function GameContent({ gameId }: { gameId: number }) {
    return (
        <Tabs defaultValue="characters" className="w-350 mx-auto  ">
            <TabsList>
                <TabsTrigger value="characters">Personajes</TabsTrigger>
                <TabsTrigger value="teams">Equipos</TabsTrigger>
            </TabsList>
            <TabsContent value="characters">
                <GameContentCharacters gameId={gameId} />
            </TabsContent>
            <TabsContent value="teams">
                <GameContentTeams gameId={gameId} />
            </TabsContent>
        </Tabs>
    );
}
