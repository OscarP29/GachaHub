import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <div className="fixed left-6 top-4">
                <Link href={"/login"} className="flex gap-2 hover:scale-101">
                    <ArrowLeft />
                    Login
                </Link>
            </div>
            {children}
        </section>
    );
}
