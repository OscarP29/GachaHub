import FormSingUp from "@/features/auth/form-singup";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crear cuenta",
    description:
        "Crea una cuenta en Gacha Hub y comienza a guardar y gestionar tu colección.",
};
export default function Page() {
    return <FormSingUp />;
}
