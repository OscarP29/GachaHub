import GameContent from "@/features/dashboard/games/game-content";
import GameHeader from "@/features/dashboard/games/game-header";

export default function Page() {
    return (
        <div className="w-full grid gap-2">
            <GameHeader />
            <GameContent />
        </div>
    );
}
