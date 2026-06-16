import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function InvalidToken() {
    return (
        <div className="flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>Enlace inválido</CardTitle>
                        <CardDescription>
                            No hemos podido verificar tu solicitud de
                            restablecimiento de contraseña.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Button>
                            <Link href="/forgot-password">
                                Solicitar un nuevo enlace
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
