import { Button } from "@/components/ui/button";
import Link from "next/link";

type PageProps = {
    searchParams: Promise<{
        email?: string;
    }>;
};

export default async function Page({ searchParams }: PageProps) {
    const { email } = await searchParams;
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
                    Verifica tu correo electrónico
                </h1>

                <p className="mt-3 text-muted-foreground">
                    Hemos enviado un enlace de confirmación a:
                </p>

                <p className="mt-2 break-all rounded-lg border bg-muted/50 px-4 py-3 font-medium">
                    {email ?? "example@example.com"}
                </p>

                <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                    <p>
                        Haz clic en el enlace que encontrarás en ese correo para
                        completar tu registro.
                    </p>

                    <p>
                        Si no lo encuentras, revisa tu carpeta de spam o correo
                        no deseado.
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                    <Button asChild size="lg">
                        <Link href="/login">Ir al inicio de sesión</Link>
                    </Button>

                    <p className="text-xs text-muted-foreground">
                        ¿Ingresaste un correo incorrecto? Regresa y vuelve a
                        registrarte.
                    </p>
                </div>
            </div>
        </div>
    );
}
