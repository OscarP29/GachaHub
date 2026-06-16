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
import { Spinner } from "@/components/ui/spinner";
import { redirect } from "next/navigation";
import InputPassword from "./input-password";
import GoogleButton from "./google-button";

const singUpSchema = z
    .object({
        name: z.string().min(1, "Ingresa un nombre"),
        email: z.email("Ingresa un email valido"),
        password: z
            .string()
            .min(8, "La contraseña debe tener minimo 8 caracteres"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export default function FormSingUp() {
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
        const rest = await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.confirmPassword,
            callbackURL: "/verified",
        });
        if (rest.error) {
            alert("Algo a salido mal en el registro, intentalo de nuevo");
        } else {
            redirect(`/verify-email?email=${data.email}`);
        }
    };
    return (
        <form id="form-signout" onSubmit={form.handleSubmit(submitHandler)}>
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

                            <InputPassword {...field} />
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
                            "Crear cuenta"
                        )}
                    </Button>
                </Field>
                <FieldSeparator>O continuar con</FieldSeparator>
                <Field>
                    <GoogleButton />
                    <FieldDescription className="text-center">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/login">Iniciar session</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
