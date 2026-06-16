"use client";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import InputPassword from "../input-password";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z
    .object({
        newPassword: z
            .string()
            .min(8, "La contraseña debe tener minimo 8 caracteres"),
        confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        path: ["confirmNewPassword"],
        message: "Las contraseñas no coinciden",
    });

export default function FormResetPassword({ token }: { token: string }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
        mode: "onChange",
    });
    const submitHandler = async (data: z.infer<typeof formSchema>) => {
        const result = await authClient.resetPassword({
            newPassword: data.confirmNewPassword,
            token,
        });
        if (result.error) {
            form.setError("root", {
                type: "server",
                message: "Ha ocurrido un error",
            });
        } else {
            redirect("/login");
        }
    };
    return (
        <form
            id="form-reset-password"
            onSubmit={form.handleSubmit(submitHandler)}
        >
            <FieldGroup>
                <Controller
                    name="newPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Nueva Contraseña</FieldLabel>
                            <InputPassword {...field} />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="confirmNewPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Confirmar nueva Contraseña</FieldLabel>
                            <InputPassword {...field} />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <FieldError>{form.formState.errors.root?.message}</FieldError>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <Spinner />
                    ) : (
                        "Cambiar contraseña"
                    )}
                </Button>
            </FieldGroup>
        </form>
    );
}
