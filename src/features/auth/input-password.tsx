"use client";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

type PasswordInputProps = React.ComponentProps<typeof Input>;

export default function InputPassword({
    className,
    ...props
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                {...props}
                type={showPassword ? "text" : "password"}
                placeholder="*****"
                className={`pr-10 ${className ?? ""}`}
            />

            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
                {showPassword ? (
                    <EyeOff className="size-4" />
                ) : (
                    <Eye className="size-4" />
                )}
            </button>
        </div>
    );
}
