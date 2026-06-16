import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import { User, UsersRound, NotebookText } from "lucide-react";
const NavItems = [
    {
        title: "Mis Personajes",
        url: "",
        icon: User,
    },
    {
        title: "Mis Equipos",
        url: "",
        icon: UsersRound,
    },
    {
        title: "Mis Notas",
        url: "",
        icon: NotebookText,
    },
];

export default function SideBarDashboard() {
    return (
        <Sidebar className="mt-15 " collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {NavItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive>
                                    <Link href={item.url}>
                                        <item.icon />
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
