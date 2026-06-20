import { Button } from "@/components/ui/button";
import GameCharacter from "./game-characters";

export default function GameContentCharacters() {
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
                <GameCharacter />
                <GameCharacter />
                <GameCharacter />
                <GameCharacter />
                <GameCharacter />
                <GameCharacter />
                <GameCharacter />
            </div>
        </div>
    );
}
