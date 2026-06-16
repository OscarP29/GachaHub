import { Check, Settings, LogOut, SunMoon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

export default function Profile() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="https://api.dicebear.com/10.x/dylan/svg?seed=Felix" />
                    <AvatarFallback>GH</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 ">
                <DropdownMenuLabel className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://api.dicebear.com/10.x/dylan/svg?seed=Felix" />
                            <AvatarFallback>GH</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1 ">
                            <span className="truncate font-medium text-sm">
                                Oscar P
                            </span>
                            <span className="truncate text-muted-foreground text-xs w-35">
                                oaperezsanchez2925@gmail.com
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Settings />
                    Configuracion de Cuenta
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <SunMoon />
                        Theme: Oscuro
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuLabel>
                                <div className="flex items-center gap-2">
                                    <Check size={18} />
                                    Oscuro
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuItem>Claro</DropdownMenuItem>
                            <DropdownMenuItem>Oscuro</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                    <LogOut />
                    Cerrar Session
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
