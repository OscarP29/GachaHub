import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { User, UsersRound, NotebookText, Gamepad2 } from "lucide-react";

const ICONS = {
    character: User,
    controller: Gamepad2,
    note: NotebookText,
    team: UsersRound,
};
type TypeIcons = keyof typeof ICONS;

interface GameCardStatsProps {
    description: string;
    title: string;
    icon: TypeIcons;
}

export default function GameCardStats({
    title,
    description,
    icon,
}: GameCardStatsProps) {
    const Icon = ICONS[icon];
    return (
        <Card className="relative">
            <CardHeader>
                <CardDescription>{description}</CardDescription>
                <CardTitle className="text-xl">{title}</CardTitle>
                <Icon
                    className="absolute top-1/2 -translate-y-1/2 right-10 opacity-30 text-primary brightness-200"
                    size={48}
                ></Icon>
            </CardHeader>
        </Card>
    );
}
