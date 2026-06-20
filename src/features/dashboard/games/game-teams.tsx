import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function GameTeams() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ratatoks</CardTitle>
                <CardDescription>
                    <div className="flex gap-2">
                        <img
                            src="https://i.pinimg.com/736x/96/27/db/9627db761bc5d7bb6dae411885a8a215.jpg"
                            alt="character image"
                            className="w-15 h-15 object-cover"
                        />
                        <img
                            src="https://i.pinimg.com/736x/96/27/db/9627db761bc5d7bb6dae411885a8a215.jpg"
                            alt="character image"
                            className="w-15 h-15 object-cover"
                        />
                        <img
                            src="https://i.pinimg.com/736x/96/27/db/9627db761bc5d7bb6dae411885a8a215.jpg"
                            alt="character image"
                            className="w-15 h-15 object-cover"
                        />
                        <img
                            src="https://i.pinimg.com/736x/96/27/db/9627db761bc5d7bb6dae411885a8a215.jpg"
                            alt="character image"
                            className="w-15 h-15 object-cover"
                        />
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
