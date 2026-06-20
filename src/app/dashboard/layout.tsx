import HeaderDashboard from "@/components/shared/header-dashboard/header";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mis Juegos",
    description: "Gestiona tu colección de videojuegos de forma sencilla.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex  flex-col w-full ">
            <HeaderDashboard />

            <div className="flex flex-1 ">{children}</div>
        </section>
    );
}
