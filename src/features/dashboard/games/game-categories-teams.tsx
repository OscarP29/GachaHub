import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Trash2, PenBox, ChevronUp, Plus } from "lucide-react";
import GameTeams from "./game-teams";
import { Button } from "@/components/ui/button";
import { app } from "@/elysia/client";

async function TeamContent() {
    return <div className="grid grid-cols-4 gap-3"></div>;
}

export default function GameCategoriesTeams({
    categoryId,
    name,
    gameid,
}: {
    categoryId: number;
    name: string;
    gameid: number;
}) {
    return (
        <Collapsible className="w-full rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between px-5 py-4">
                <h3 className="text-base font-semibold tracking-tight text-foreground capitalize">
                    {name}
                </h3>
                <div className="flex items-center gap-2">
                    <CollapsibleTrigger asChild>
                        <Button variant="outline" size="icon">
                            <ChevronUp className="h-4 w-4" />
                        </Button>
                    </CollapsibleTrigger>
                    <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <PenBox className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <CollapsibleContent>
                <div className="border-t border-border px-5 py-4">
                    <TeamContent />
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
