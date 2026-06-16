import FormResetPassword from "@/features/auth/auth-accion/form-reset-password";
import InvalidToken from "@/features/auth/auth-accion/invalid-token";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Restablecer contraseña",
    description:
        "Introduce una nueva contraseña para recuperar el acceso a tu cuenta.",
};
type PageProps = {
    searchParams: Promise<{
        token: string;
    }>;
};
export default async function Page({ searchParams }: PageProps) {
    const { token } = await searchParams;

    if (!token) return <InvalidToken />;

    return (
        <div className="flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="mb-6">
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
                    <h1 className="text-3xl font-bold">
                        Restablecer tu contraseña
                    </h1>

                    <p className="mt-3 text-sm text-muted-foreground">
                        Por favor, establezca su nueva contraseña.
                    </p>
                </div>
                <FormResetPassword token={token} />
            </div>
        </div>
    );
}
