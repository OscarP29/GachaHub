import { Card, CardTitle } from "@/components/ui/card";

import Link from "next/link";

interface GameCardProps {
    id: number;
    imageUrl: string;
    title: string;
}

export default function GameCard({ id, imageUrl, title }: GameCardProps) {
    return (
        <Card className="max-w-80 h overflow-hidden p-0">
            <Link href={`/dashboard/games/${id}`} className="block">
                <div className="relative h-30 overflow-hidden group">
                    <img
                        src={imageUrl}
                        alt="Imagen Juego"
                        className="w-full h-full object-cover brightness-90 transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                    <CardTitle className="absolute bottom-2.5 left-3.5 text-foreground text-lg">
                        {title}
                    </CardTitle>
                </div>
            </Link>
        </Card>
    );
}
