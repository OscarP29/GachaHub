import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameContentCharacters from "./game-content-characters";
import GameContentTeams from "./game-content-teams";

export default function GameContent() {
    return (
        <Tabs defaultValue="characters" className="w-350 mx-auto  ">
            <TabsList>
                <TabsTrigger value="characters">Personajes</TabsTrigger>
                <TabsTrigger value="teams">Equipos</TabsTrigger>
            </TabsList>
            <TabsContent value="characters">
                <GameContentCharacters />
            </TabsContent>
            <TabsContent value="teams">
                <GameContentTeams />
            </TabsContent>
        </Tabs>
    );
}
