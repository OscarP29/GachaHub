import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FormCreateGame from "./form-create-game";
import { Plus } from "lucide-react";

export default function GameCardCreate() {
    return (
        <Dialog>
            <DialogTrigger>
                <Card className="w-80 overflow-hidden p-0">
                    <div className="relative h-30 overflow-hidden group border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/60 transition-colors duration-300 bg-muted/30 hover:bg-muted/50 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                            <Plus className="size-8 transition-transform duration-300 group-hover:scale-110" />
                            <span className="text-sm font-medium">
                                Nuevo Juego
                            </span>
                        </div>
                    </div>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <FormCreateGame />
            </DialogContent>
        </Dialog>
    );
}
