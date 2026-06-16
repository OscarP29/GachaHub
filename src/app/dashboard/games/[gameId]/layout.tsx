import SideBarDashboard from "@/components/shared/side-bar-dashboard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gacha1",
    description: "Gestiona tu colección de videojuegos de forma sencilla.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <SideBarDashboard />
            <main className="flex-1 overflow-auto">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
