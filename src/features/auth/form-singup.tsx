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
import z, { email } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { redirect } from "next/navigation";

const singUpSchema = z
    .object({
        name: z.string().min(1, "Ingresa un nombre"),
        email: z.email("Ingresa un email valido"),
        password: z
            .string()
            .trim()
            .min(8, "La contraseña debe tener minimo 8 caracteres"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export default function FormSingUp() {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof singUpSchema>>({
        resolver: zodResolver(singUpSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const submitHandler = async (data: z.infer<typeof singUpSchema>) => {
        setLoading(true);
        const rest = await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.confirmPassword,
            callbackURL: "/verified",
        });
        if (rest.error) {
            setLoading(false);
            alert("Algo a salido mal en el registro, intentalo de nuevo");
        } else {
            setLoading(false);
            redirect(`/verify-email?email=${data.email}`);
        }
    };
    return (
        <form id="form-login" onSubmit={form.handleSubmit(submitHandler)}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
                    <p className="text-sm text-balance text-muted-foreground">
                        Complete el siguiente formulario para crear su cuenta
                    </p>
                </div>
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>name</FieldLabel>

                            <Input
                                {...field}
                                required
                                placeholder="Alvaro Diaz"
                                data-invalid={fieldState.invalid}
                                autoComplete="false"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
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
                            <FieldLabel>Contraseña</FieldLabel>

                            <Input
                                {...field}
                                type="password"
                                placeholder="*****"
                                data-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Confirmar contraseña</FieldLabel>

                            <Input
                                {...field}
                                type="password"
                                required
                                placeholder="*****"
                                autoComplete="false"
                                data-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Field>
                    <Button type="submit" disabled={loading}>
                        {loading ? <Spinner /> : "Crear Cuenta"}
                    </Button>
                </Field>
                <FieldSeparator>O continuar con</FieldSeparator>
                <Field>
                    <Button variant="outline" type="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M21.805 10.023H12v3.955h5.617c-.242 1.27-.967 2.346-2.06 3.068v2.55h3.328c1.947-1.793 3.07-4.432 3.07-7.596 0-.66-.06-1.293-.15-1.977z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 22c2.79 0 5.13-.924 6.84-2.504l-3.328-2.55c-.924.62-2.105.986-3.512.986-2.698 0-4.985-1.822-5.802-4.27H2.76v2.684A9.998 9.998 0 0 0 12 22z"
                            />
                            <path
                                fill="currentColor"
                                d="M6.198 13.662A5.996 5.996 0 0 1 5.88 12c0-.577.104-1.136.318-1.662V7.654H2.76A9.998 9.998 0 0 0 2 12c0 1.61.385 3.133 1.06 4.346z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 6.068c1.518 0 2.88.522 3.953 1.546l2.963-2.963C17.126 2.987 14.786 2 12 2A9.998 9.998 0 0 0 2.76 7.654l3.438 2.684C7.015 7.89 9.302 6.068 12 6.068z"
                            />
                        </svg>
                        Iniciar sesión con Google
                    </Button>
                    <FieldDescription className="text-center">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/login">Iniciar session</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
