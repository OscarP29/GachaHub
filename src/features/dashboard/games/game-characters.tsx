import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface GameCharacterProps {
    character: {
        id: number;
        gameId: number;
        userId: string;
        name: string;
        imageUrl: string;
        role: "dps" | "sub_dps" | "support" | "tank";
        rarity: string | null;
        owned: boolean;
        equipmentNotes: string | null;
        createdAt: string;
    };
}

export default function GameCharacter({ character }: GameCharacterProps) {
    return (
        <Card className={`${character.owned ? "" : "grayscale-100"}`}>
            <img
                src={character.imageUrl}
                alt="Character Image"
                className=" object-cover w-full h-60 object-top"
            />
            <CardHeader>
                <CardTitle className="truncate max-w-40 capitalize">
                    {character.name}
                </CardTitle>
                <CardAction>
                    <Badge className="capitalize">{character.role}</Badge>
                </CardAction>
                <CardDescription>{character.rarity}</CardDescription>
            </CardHeader>
        </Card>
    );
}
