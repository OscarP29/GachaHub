import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-md text-center">
                <div className="mb-6 flex justify-center">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <polygon
                            points="100,10 114,86 190,100 114,114 100,190 86,114 10,100 86,86"
                            fill="#a50036"
                        />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold tracking-tight">
                    ¡Correo verificado!
                </h1>

                <p className="mt-3 text-muted-foreground">
                    Tu dirección de correo electrónico ha sido verificada
                    correctamente.
                </p>

                <div className="mt-8">
                    <Button>
                        <Link href="/login">Iniciar sesión</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
