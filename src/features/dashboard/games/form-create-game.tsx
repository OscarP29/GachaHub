"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const MAX_MB = 2;
const MAX_SIZE = MAX_MB * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const formSchema = z.object({
    title: z
        .string()
        .min(1, "El título es requerido")
        .max(50, "Máximo 50 caracteres"),

    image: z
        .instanceof(File)
        .refine((f) => f.size <= MAX_SIZE, `Maximo ${MAX_MB}MB`)
        .refine(
            (f) => IMAGE_TYPES.includes(f.type),
            "Solo se aceptan .jpg .png .webp",
        ),
});

export default function FormCreateGame() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
    };
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
                <DialogTitle>Nuevo Juego</DialogTitle>
            </DialogHeader>
            <FieldGroup>
                <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Titulo</FieldLabel>
                            <Input
                                {...field}
                                required
                                data-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="image"
                    control={form.control}
                    render={({
                        field: { onChange, onBlur, name, ref },
                        fieldState,
                    }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Imagen</FieldLabel>
                            <Input
                                type="file"
                                name={name}
                                ref={ref}
                                onBlur={onBlur}
                                data-invalid={fieldState.invalid}
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) onChange(file);
                                }}
                            />
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
                        {form.formState.isSubmitting ? <Spinner /> : "Crear"}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    );
}
