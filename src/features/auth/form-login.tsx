"use client";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import InputPassword from "./input-password";
import GoogleButton from "./google-button";

const loginSchema = z.object({
    email: z.email("Ingresa un email valido"),
    password: z.string().trim().min(1, "Ingresa una contraseña"),
});

export default function FormLogin() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const submitHandler = async (data: z.infer<typeof loginSchema>) => {
        const result = await authClient.signIn.email({
            email: data.email,
            password: data.password,
        });
        if (result.error?.status === 401) {
            form.setError("password", {
                type: "server",
                message: "Email o contraseña invalidos",
            });
            form.setError("email", {
                type: "server",
                message: "Email o contraseña invalidos",
            });
        } else {
            redirect("/");
        }
    };

    return (
        <form id="form-login" onSubmit={form.handleSubmit(submitHandler)}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">
                        Ingresa con tu cuenta
                    </h1>
                    <p className="text-sm text-balance text-muted-foreground ">
                        Ingrese su correo electrónico a continuación para
                        iniciar sesión en su cuenta
                    </p>
                </div>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Email</FieldLabel>

                            <Input
                                {...field}
                                required
                                placeholder="example@example.com"
                                data-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <div className="flex items-center">
                                <FieldLabel>Contraseña</FieldLabel>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto text-sm underline-offset-4 hover:underline"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <InputPassword {...field} />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Field>
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? (
                            <Spinner />
                        ) : (
                            "Iniciar Session"
                        )}
                    </Button>
                </Field>
                <FieldSeparator>O continuar con</FieldSeparator>
                <Field>
                    <GoogleButton />
                    <FieldDescription className="text-center">
                        ¿No tienes una cuenta?{" "}
                        <Link href="/signup">Crear cuenta</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
