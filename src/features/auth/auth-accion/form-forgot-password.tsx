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
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";

const forgotPasswordSchema = z.object({
    email: z.email("Introduce un correo electrónico válido"),
});
export default function FormForgotPassword() {
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const submitHandler = async (
        data: z.infer<typeof forgotPasswordSchema>,
    ) => {
        const result = await authClient.requestPasswordReset({
            email: data.email,
            redirectTo: `/reset-password`,
        });
        if (result.error) {
            console.log(result.error);
            form.setError("root", {
                type: "server",
                message: "Ha ocurrido un error",
            });
        } else {
            redirect("/login");
        }
    };
    return (
        <form id="form-email" onSubmit={form.handleSubmit(submitHandler)}>
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Email</FieldLabel>

                            <Input
                                {...field}
                                type="email"
                                placeholder="example@example.com"
                                data-invalid={fieldState.invalid}
                                required
                                {...form.register("email")}
                            />

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
                        "Enviar enlace de recuperacion"
                    )}
                </Button>
            </FieldGroup>
        </form>
    );
}
