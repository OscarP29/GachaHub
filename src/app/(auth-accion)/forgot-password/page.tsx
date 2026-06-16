import FormForgotPassword from "@/features/auth/auth-accion/form-forgot-password";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Olvidé mi contraseña",
    description:
        "Solicita un enlace para restablecer la contraseña de tu cuenta de forma segura.",
};
export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center text-center">
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
                        ¿Olvidaste tu contraseña?
                    </h1>

                    <p className="mt-3 text-sm text-muted-foreground">
                        Introduce tu correo electrónico y te enviaremos un
                        enlace para restablecer tu contraseña.
                    </p>
                </div>

                <FormForgotPassword />
            </div>
        </div>
    );
}
