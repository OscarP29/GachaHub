import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function GameCharacter() {
    return (
        <Card>
            <img
                src="https://i.pinimg.com/1200x/9c/c8/a3/9cc8a3f374e95fb8f3ae1ab3b696039b.jpg"
                alt="Character Image"
                className=" object-cover"
            />
            <CardHeader>
                <CardTitle className="truncate max-w-40">
                    Melidas Asalto
                </CardTitle>
                <CardAction>
                    <Badge>Sub-dps</Badge>
                </CardAction>
                <CardDescription>SSR</CardDescription>
            </CardHeader>
        </Card>
    );
}
