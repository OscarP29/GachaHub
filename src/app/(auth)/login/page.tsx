import FormLogin from "@/features/auth/form-login";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Iniciar sesión",
    description:
        "Accede a tu cuenta para gestionar tu colección y continuar tu experiencia en Gacha Hub.",
};
export default function Page() {
    return <FormLogin />;
}
